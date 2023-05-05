import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { list } from './app/list';
import { SuperAdminListQuery } from './models/super-admin-list-query';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    SuperAdminListQuery,
    event.queryStringParameters,
    { validator: { whitelist: true } }
  )) as SuperAdminListQuery;
  const response = await list(query);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('super_admin_list_get', lambda))
);
