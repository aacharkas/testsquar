import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { BadRequestException } from '@squaredash/shared/util';

import { deleteById } from './app/delete';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters.id === context.user.id) {
    throw new BadRequestException(`User can't delete himself`);
  }

  await deleteById(event.pathParameters.id);

  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message: 'IM0019' }),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('user_delete', lambda))
);
