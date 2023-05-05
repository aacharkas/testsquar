import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { updateStatus } from './app/update-status';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  await updateStatus(
    event.pathParameters.id,
    context.user.id,
    context.user.companyId
  );

  return {
    statusCode: HTTP_STATUS.NO_CONTENT,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('user_status_update', lambda))
);
