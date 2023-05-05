import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as customerService from '@squaredash/customer';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const get = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const isCompanyUser = context.user.role === USER_ROLE.COMPANY_USER;
  const customer = await customerService.getByIdWithMeta(
    event.pathParameters.id,
    context.user.companyId,
    context.user.id,
    isCompanyUser
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify(customer),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('customer_get', get))
);
