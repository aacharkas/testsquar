import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { AuthTokens } from '@squaredash/auth';
import * as authService from '@squaredash/auth';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { SignInBody } from './models/sign-in-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(
    SignInBody,
    event.body
  )) as SignInBody;
  const { cookies, tokens } = await authService.signIn(body);
  const response: AuthTokens & { finishedOnboarding?: boolean } = tokens;

  return {
    statusCode: HTTP_STATUS.OK,
    multiValueHeaders: {
      'Set-Cookie': cookies,
    },
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(lambda);
