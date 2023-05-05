import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { errorHandlerMiddleware } from '@squaredash/shared/middlewares';

import { signOut } from './app/sign-out';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  await signOut(event);

  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(lambda);
