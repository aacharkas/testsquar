import { AwsClient } from '@squaredash/shared/apis/aws-sdk';

export async function getS3Files(bucketName: string) {
  const awsClient = new AwsClient();
  const s3Client = awsClient.getS3({ apiVersion: '2006-03-01' });
  const s3BucketContent = await s3Client.getBucketContent(
    bucketName,
    'resources/'
  );
  return s3BucketContent
    .map((s) => ({ key: s.Key }))
    .filter((e) => e.key.endsWith('.pdf'));
}
