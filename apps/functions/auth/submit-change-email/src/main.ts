import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as authService from '@squaredash/auth';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';

import { SubmitChangedEmailBody } from './models/submit-changed-email.body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(
    SubmitChangedEmailBody,
    event.body
  )) as SubmitChangedEmailBody;

  const res = await authService.submitChangedEmail(body);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(res),
  };
};

exports.handler = errorHandlerMiddleware(lambda);
