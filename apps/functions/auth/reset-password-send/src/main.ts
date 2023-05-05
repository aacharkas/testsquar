import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as authService from '@squaredash/auth';
import * as userCrud from '@squaredash/crud/user';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';

import { ResetPasswordSendBody } from './models/reset-password-send-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(
    ResetPasswordSendBody,
    event.body
  )) as ResetPasswordSendBody;

  const user = await userCrud.find({ where: { email: body.email } });

  await authService.resetPasswordSend(user);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: null,
  };
};

exports.handler = errorHandlerMiddleware(lambda);
