import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as claimItemService from '@squaredash/crud/claim-item';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { ClaimItemCreateBody } from './models/claim-item-create-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(ClaimItemCreateBody, event.body, {
    validator: { whitelist: true },
  })) as ClaimItemCreateBody;

  const reviewed = [USER_ROLE.SUPER_ADMIN, USER_ROLE.INITIAL_ADMIN].includes(
    context.user.role
  );
  const data = await claimItemService.create({ ...body, reviewed });

  return {
    statusCode: HTTP_STATUS.CREATED,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('claim_item_create', lambda))
);
