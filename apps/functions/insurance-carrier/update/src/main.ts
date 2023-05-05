import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { update } from './app/update';
import { UpdateInsuranceCarrierBody } from './models/update-insurance-carrier-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(
    UpdateInsuranceCarrierBody,
    event.body,
    { validator: { whitelist: true } }
  )) as UpdateInsuranceCarrierBody;

  const response = await update(event.pathParameters.id, body);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_carrier_update', lambda)
  )
);
