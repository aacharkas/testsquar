import aws, { ApiGatewayManagementApi, Lambda } from 'aws-sdk';

import { Config } from '@squaredash/shared/util';

import { S3Client } from './s3-client';

// Credentials are loaded by aws-sdk from env variables
export class AwsClient {
  private AWS: typeof aws;

  constructor() {
    this.AWS = aws;
  }

  getS3(config: aws.S3.ClientConfiguration) {
    return new S3Client(this.AWS, config);
  }

  getLamda(config: aws.Lambda.ClientConfiguration) {
    return new Lambda(config);
  }

  public getApiGatewayManagementApi(endpoint: string) {
    return new ApiGatewayManagementApi({
      apiVersion: '2018-11-29',
      endpoint,
      region: Config.AWS.region,
    });
  }
}
