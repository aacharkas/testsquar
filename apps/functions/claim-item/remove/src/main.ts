import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import * as claimItemService from '@squaredash/crud/claim-item';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  await claimItemService.remove({
    id: event.pathParameters.id,
  });

  return {
    statusCode: HTTP_STATUS.NO_CONTENT,
    headers: {
      'content-type': 'application/json',
    },
    body: null,
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('claim_item_remove', lambda))
);
