import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as authService from '@squaredash/auth';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { SignUpBody } from './models/sign-up-body';

const signUp = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(SignUpBody, event.body, {
    validator: { whitelist: true },
  })) as SignUpBody;
  const { cookies, tokens } = await authService.signUp(body);

  return {
    statusCode: HTTP_STATUS.OK,
    multiValueHeaders: {
      'Set-Cookie': cookies,
    },
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(tokens),
  };
};

exports.handler = errorHandlerMiddleware(signUp);
