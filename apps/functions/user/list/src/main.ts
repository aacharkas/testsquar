import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';
import * as userService from '@squaredash/user';

import { ListUserQuery } from './models/list-user-query';

const list = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const isUserSuperAdmin =
    context.user.role === USER_ROLE.SUPER_ADMIN ||
    context.user.role === USER_ROLE.INITIAL_ADMIN;
  const isUserAdmin = context.user.role === USER_ROLE.COMPANY_ADMIN;

  const query = (await transformAndValidate(ListUserQuery, {
    ...event.queryStringParameters,
    isUserSuperAdmin,
    isUserAdmin,
  })) as ListUserQuery;

  const result = await userService.list({
    ...query,
    companyId: isUserSuperAdmin ? query.companyId : context.user.companyId,
    roles: !isUserAdmin ? query.roles : [USER_ROLE.COMPANY_USER],
  });

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(result),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('user_list_get', list))
);
