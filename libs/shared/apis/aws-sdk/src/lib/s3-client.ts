import aws from 'aws-sdk';

import { Logger } from '@squaredash/shared/util';

export class S3Client {
  readonly s3: aws.S3;
  private readonly logger: Logger;

  constructor(AWS: typeof aws, config: aws.S3.ClientConfiguration) {
    this.s3 = new AWS.S3(config);
    this.logger = new Logger(this.constructor.name);
  }

  getObject(params: aws.S3.GetObjectRequest) {
    return this.s3.getObject(params);
  }

  async getObjectAttributes(params: aws.S3.GetObjectAttributesRequest) {
    return this.s3.getObjectAttributes(params).promise();
  }

  putObject(params: aws.S3.PutObjectRequest) {
    return this.s3.putObject(params);
  }

  async getBucketContent(
    bucketName: string,
    prefix: string,
    recursion = false
  ): Promise<AWS.S3.Object[]> {
    let contents: AWS.S3.Object[] = [];
    try {
      const params = {
        Bucket: bucketName,
        Prefix: prefix,
      };
      const data = await this.s3.listObjectsV2(params).promise();
      const { Contents, CommonPrefixes } = data;
      if (Contents && Contents.length > 0) {
        contents = contents.concat(Contents);
      }
      if (recursion && CommonPrefixes && CommonPrefixes.length > 0) {
        const promises: Promise<AWS.S3.Object>[] =
          [] as Promise<AWS.S3.Object>[];
        for (const commonPrefix of CommonPrefixes) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // prettier-ignore
          promises.push(this.getBucketContent(bucketName, commonPrefix.Prefix, recursion));
        }
        const results = await Promise.all(promises);
        for (const result of results) {
          contents = contents.concat(result);
        }
      }
    } catch (err) {
      this.logger.error(err);
    }
    return contents;
  }

  async isFolder(bucketName: string, path: string): Promise<boolean> {
    const objectsInfo = await this.s3
      .listObjectsV2({
        Bucket: bucketName,
        Delimiter: '/',
        Prefix: path,
      })
      .promise();
    if (
      objectsInfo.Contents &&
      objectsInfo.Contents.length === 1 &&
      objectsInfo.Contents[0].Key === path
    ) {
      return false;
    }
    return true;
  }

  public async getPresignedPutUrl(params: aws.S3.PutObjectRequest) {
    return this.s3.getSignedUrlPromise('putObject', params);
  }
}
