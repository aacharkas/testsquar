import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';

import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { approve } from './app/approve';

const lambda = async (
  event: APIGatewayEvent
): Promise<APIGatewayProxyResult> => {
  await approve(event.pathParameters.id);

  return {
    statusCode: HTTP_STATUS.NO_CONTENT,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('claim_item_approve', lambda))
);
