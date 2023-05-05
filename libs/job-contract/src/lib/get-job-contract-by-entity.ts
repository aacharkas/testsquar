import { JobContract as JobContractEntity } from '@prisma/client';

import { AwsClient } from '@squaredash/shared/apis/aws-sdk';
import { UPLOAD_TYPE, UPLOAD_TYPE_MAP } from '@squaredash/shared/constants';
import { Config, getFileLink } from '@squaredash/shared/util';

import { JobContract } from './models/job-contract';

const s3Client = new AwsClient().getS3({ apiVersion: '2006-03-01' });
const uploadConfig = UPLOAD_TYPE_MAP[UPLOAD_TYPE.JOB_CONTRACT];

export async function getJobContractByEntity(
  jobContract: JobContractEntity
): Promise<JobContract> {
  const fileAttributes = await s3Client.getObjectAttributes({
    Bucket: Config.AWS.publicBucket,
    Key: `${uploadConfig.prefix}/${jobContract.fileId}`,
    ObjectAttributes: ['ObjectSize'],
  });

  return {
    ...jobContract,
    fileSize: fileAttributes.ObjectSize || 0,
    link: getFileLink(jobContract.fileId, UPLOAD_TYPE.JOB_CONTRACT),
  };
}
