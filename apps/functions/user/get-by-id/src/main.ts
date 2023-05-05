import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as changeEmailRequestsService from '@squaredash/change-email-request';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS, NotFoundException } from '@squaredash/shared/util';
import * as userService from '@squaredash/user';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const user = await userService.getByIdWithAddress(event.pathParameters.id);

  if (!user) {
    throw new NotFoundException('IM0035');
  }

  const changeEmailRequest = await changeEmailRequestsService.findValidByUserId(
    user.id
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ ...user, changeEmailRequest }),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('user_profile_get_by_id', lambda))
);
