import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { list } from './app/list';
import { ListClaimItemsQuery } from './models/list-claim-items-query';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const query = (await transformAndValidate(
    ListClaimItemsQuery,
    event.queryStringParameters,
    { validator: { whitelist: true } }
  )) as ListClaimItemsQuery;

  const data = await list(query);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('claim_item_list', lambda))
);
