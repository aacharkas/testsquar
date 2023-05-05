import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as claimItemService from '@squaredash/crud/claim-item';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { ClaimItemUpdateBody } from './models/claim-item-update-body';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(ClaimItemUpdateBody, event.body, {
    validator: { whitelist: true },
  })) as ClaimItemUpdateBody;

  const data = await claimItemService.update(
    {
      id: event.pathParameters.id,
    },
    body
  );

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('claim_item_update', lambda))
);
