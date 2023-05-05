import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as authService from '@squaredash/auth';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';

import { ResetPasswordRecieveBody } from './models/reset-password-recieve-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { token } = event.queryStringParameters;

  const body = (await transformAndValidate(
    ResetPasswordRecieveBody,
    event.body
  )) as ResetPasswordRecieveBody;

  await authService.resetPasswordRecieve(token, body.password);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: null,
  };
};

exports.handler = errorHandlerMiddleware(lambda);
