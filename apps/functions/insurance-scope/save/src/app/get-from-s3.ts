import { AwsClient } from '@squaredash/shared/apis/aws-sdk';
import { UPLOAD_TYPE, UPLOAD_TYPE_MAP } from '@squaredash/shared/constants';
import { Nullable } from '@squaredash/shared/interfaces';
import { ScopeContent } from '@squaredash/shared/models';
import { Config, Logger } from '@squaredash/shared/util';

export async function getFromS3(
  objectId: string
): Promise<Nullable<ScopeContent>> {
  try {
    const resultsConfig =
      UPLOAD_TYPE_MAP[UPLOAD_TYPE.INSURANCE_SCOPE_EXTRACTED];
    const resultsPath = `${resultsConfig.prefix}/${objectId}`;

    const s3Client = new AwsClient().getS3({ apiVersion: '2006-03-01' });
    const result = await s3Client
      .getObject({
        Bucket: Config.AWS.publicBucket,
        Key: resultsPath,
      })
      .promise();

    const content = result?.Body?.toString();
    return JSON.parse(content);
  } catch (e) {
    const logger = new Logger('SaveInsuranceScope');
    logger.log(
      'Failed to get insurance scope content from S3 ' + JSON.stringify(e)
    );
    return null;
  }
}
