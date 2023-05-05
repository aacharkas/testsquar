import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { list as getList } from './app/list';
import { UnitOfMeasurementListQuery } from './models/unit-of-measurement-list-query';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    UnitOfMeasurementListQuery,
    event.queryStringParameters,
    { validator: { whitelist: true } }
  )) as UnitOfMeasurementListQuery;

  const response = await getList(query);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(
    hasRequiredPermissionsMiddleware('unit_of_measurement_list', lambda)
  )
);
