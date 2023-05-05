import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { list } from './app/list';
import { ListInsuranceCarrierQuery } from './models/list-insurance-carrier-query';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    ListInsuranceCarrierQuery,
    event.queryStringParameters,
    { validator: { whitelist: true } }
  )) as ListInsuranceCarrierQuery;

  const response = await list(query);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('insurance_carrier_list', lambda))
);
