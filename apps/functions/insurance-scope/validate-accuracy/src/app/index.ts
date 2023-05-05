import { AWSError, S3 } from 'aws-sdk';
import { PromiseResult } from 'aws-sdk/lib/request';

import * as accuracyCheckRepository from '@squaredash/crud/accuracy-check';
import { ScopeProcessor } from '@squaredash/scope-processor';
import { AwsClient } from '@squaredash/shared/apis/aws-sdk';

import { sendNotificationToChannel } from './utils';

export async function checkAlgorithmAccuracy(
  bucketName: string,
  documentsNames: string[]
) {
  const scopeProcessor = new ScopeProcessor();
  const awsClient = new AwsClient();
  const s3Client = awsClient.getS3({ apiVersion: '2006-03-01' });
  const lambdaClient = awsClient.getLamda({ region: 'us-east-1' });

  await accuracyCheckRepository.deleteMany({ where: {} });
  const accuracyCheck = await accuracyCheckRepository.create({ data: {} });
  const accuracies: number[] = [];

  await Promise.all(
    documentsNames.map(async (name) => {
      await scopeProcessor.processPath(bucketName, name);
    })
  );

  const data = await lambdaClient
    .invoke({
      FunctionName: 'algo_result_parsing',
      InvocationType: 'RequestResponse',
    })
    .promise();
  if (data.StatusCode !== 200) {
    throw new Error('algo_result_parsing unavailable');
  }

  await Promise.all(
    documentsNames.map(async (name) => {
      const key = documentNameToResultName(name);

      const result = await s3Client
        .getObject({
          Bucket: bucketName,
          Key: key,
        })
        .promise();

      const accuracy = accuracyCheckResultToAccuracy(result);

      accuracies.push(accuracy);

      await accuracyCheckRepository.createDocument({
        data: {
          name,
          accuracy,
          run: {
            connect: {
              id: accuracyCheck.id,
            },
          },
        },
      });
    })
  );

  const avgAccuracy = accuracies.reduce((a, b) => a + b, 0) / accuracies.length;

  await accuracyCheckRepository.createDocument({
    data: {
      name: '*',
      accuracy: avgAccuracy,
      run: {
        connect: {
          id: accuracyCheck.id,
        },
      },
    },
  });

  await accuracyCheckRepository.update({
    data: {
      finishedAt: new Date(),
    },
    where: {
      id: accuracyCheck.id,
    },
  });

  await sendNotificationToChannel({
    finished: true,
  });
}

function documentNameToResultName(name: string) {
  const documentName = name.split('/').at(-1).replace('.pdf', '');
  return `results/${documentName}/report.txt`;
}

function accuracyCheckResultToAccuracy(
  result: PromiseResult<S3.GetObjectOutput, AWSError>
) {
  const resultBody = result.Body.toString();
  const accuracyRegex = /Total accuracy: (\d+(?:\.\d+)?) %/;
  return Number(resultBody.match(accuracyRegex)[1]);
}
