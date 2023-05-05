import { APIGatewayProxyResult } from 'aws-lambda';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { Config } from '@squaredash/shared/util';

import { getS3Files } from './app';

const lambda = async (): Promise<APIGatewayProxyResult> => {
  const bucketName = Config.AWS.publicBucket;

  const data = await getS3Files(bucketName);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('s3_files_list', lambda))
);
