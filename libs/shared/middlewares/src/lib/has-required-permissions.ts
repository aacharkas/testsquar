import { APIGatewayProxyEvent, Handler } from 'aws-lambda';
import { Callback } from 'aws-lambda/handler';

import { getRolePermissionsByRole } from '@squaredash/role';
import { CustomContext } from '@squaredash/shared/interfaces';
import { ForbiddenException } from '@squaredash/shared/util';

export const hasRequiredPermissionsMiddleware = (
  action: string,
  handler: Handler
) => {
  return async (
    event: APIGatewayProxyEvent,
    context: CustomContext,
    callback: Callback<unknown>
  ) => {
    const permissions = getRolePermissionsByRole(context.user.role);
    if (!permissions[action]) {
      throw new ForbiddenException('This role does not has access to do it.');
    }

    return handler(event, context, callback);
  };
};
