import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { lookup } from 'mime-types';
import { v4 } from 'uuid';

import { isUploadType } from '@squaredash/file';
import { AwsClient } from '@squaredash/shared/apis/aws-sdk';
import { UPLOAD_TYPE_MAP } from '@squaredash/shared/constants';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { Config, HTTP_STATUS } from '@squaredash/shared/util';

import { InvalidContentTypeError } from './errors/invalid-content-type.error';
import { InvalidUploadTypeError } from './errors/invalid-upload-type.error';

const getUploadUrl = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { uploadConfig, contentType } = validateRequest(event);

  const objectId = v4();
  const presignedUrl = await getPresignedUrl(
    uploadConfig,
    objectId,
    contentType
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ id: objectId, signedUrl: presignedUrl }),
  };
};

function validateRequest(event: APIGatewayEvent) {
  const uploadType = event.pathParameters.type;
  if (!isUploadType(uploadType)) {
    throw new InvalidUploadTypeError();
  }

  const uploadConfig = UPLOAD_TYPE_MAP[uploadType];

  const fileExtension = event.queryStringParameters.extension;
  const mimeType = lookup(fileExtension);

  const isAllowedMimeType =
    mimeType && uploadConfig.allowedMimeTypes.includes(mimeType);
  if (!mimeType || !isAllowedMimeType) {
    throw new InvalidContentTypeError();
  }

  return { uploadConfig, contentType: mimeType };
}

async function getPresignedUrl(
  uploadConfig: { prefix: string },
  objectId: string,
  objectContentType: string
): Promise<string> {
  const awsClient = new AwsClient();
  const s3Client = awsClient.getS3({ apiVersion: '2006-03-01' });

  const putRequest: PutObjectRequest = {
    Bucket: Config.AWS.publicBucket,
    Key: `${uploadConfig.prefix}/${objectId}`,
    ContentType: objectContentType,
  };
  return s3Client.getPresignedPutUrl(putRequest);
}

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('file_upload', getUploadUrl))
);
