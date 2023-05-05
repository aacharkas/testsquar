import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as insuranceCarrierCrud from '@squaredash/crud/insurance-carrier';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import * as util from '@squaredash/shared/util';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const name = event.pathParameters.name;

  const insuranceCarrier = await insuranceCarrierCrud.findFirst({ name });

  if (!insuranceCarrier) {
    throw new util.NotFoundException('IM0053');
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(insuranceCarrier),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('insurance_carrier_get', lambda))
);
