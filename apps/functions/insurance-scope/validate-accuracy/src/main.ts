import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { Config } from '@squaredash/shared/util';

import { checkAlgorithmAccuracy } from './app';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { documents } = JSON.parse(event.body) as { documents: string[] };

  const bucketName = Config.AWS.publicBucket;

  await checkAlgorithmAccuracy(bucketName, documents);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('algorithm_accuracy_check', lambda)
  )
);
