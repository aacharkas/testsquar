import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';

import { update } from './app/update';
import { UpdateUserBody } from './models/update-user-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(UpdateUserBody, event.body, {
    validator: { whitelist: true },
  })) as UpdateUserBody;

  const response = await update(event.pathParameters.id, body, context);

  return {
    statusCode: 200,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(response),
  };
};

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('user_update', lambda))
);
