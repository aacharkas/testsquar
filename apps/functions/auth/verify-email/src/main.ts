import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as authService from '@squaredash/auth';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const verifyEmail = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { token } = event.queryStringParameters;

  const { cookies, tokens } = await authService.verifyEmail(token);

  return {
    statusCode: HTTP_STATUS.OK,
    multiValueHeaders: {
      'Set-Cookie': cookies,
    },
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(tokens),
  };
};

exports.handler = errorHandlerMiddleware(verifyEmail);
