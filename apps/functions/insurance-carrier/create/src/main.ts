import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { create } from './app/create';
import { CreateInsuranceCarrierBody } from './models/create-insurance-carrier-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate<CreateInsuranceCarrierBody>(
    CreateInsuranceCarrierBody,
    event.body,
    { validator: { whitelist: true } }
  )) as CreateInsuranceCarrierBody;

  const response = await create(body);

  return {
    statusCode: 201,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('insurance_carrier_create', lambda)
  )
);
