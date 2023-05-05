import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as authService from '@squaredash/auth';
import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const { token } = event.queryStringParameters;

  const { newEmail } = await authService.verifyChangedEmail(token);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      email: newEmail,
    }),
  };
};

exports.handler = errorHandlerMiddleware(lambda);
