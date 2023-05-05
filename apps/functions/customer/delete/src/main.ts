import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as customerService from '@squaredash/customer';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const deleteCustomer = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  await customerService.deleteCustomer(
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
  authGuard(hasRequiredPermissionsMiddleware('customer_delete', deleteCustomer))
);
