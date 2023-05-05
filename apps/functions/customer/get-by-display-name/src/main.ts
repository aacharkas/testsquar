import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as customersService from '@squaredash/customer';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { CustomerWithGivenDisplayNameNotExistsException } from './exceptions/customer-with-given-display-name-not-exists.exception';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const displayName = event.pathParameters.displayName;

  const customer = await customersService.findByDisplayName(displayName);

  if (!customer) {
    throw new CustomerWithGivenDisplayNameNotExistsException();
  }

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
  authGuard(hasRequiredPermissionsMiddleware('customer_get', lambda))
);
