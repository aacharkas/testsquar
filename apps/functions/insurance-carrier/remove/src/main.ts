import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { remove } from './app/remove';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  await remove(event.pathParameters.id);

  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_carrier_remove', lambda)
  )
);
