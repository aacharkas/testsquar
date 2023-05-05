import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { HTTP_STATUS } from '@squaredash/shared/util';

import { updateStatus } from './app/update-status';
import { UpdateStatusBody } from './models/update-status-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const body = (await transformAndValidate(UpdateStatusBody, event.body, {
    validator: { whitelist: true },
  })) as UpdateStatusBody;
  const companyId = event.pathParameters.id;

  await updateStatus(companyId, body.status, {
    id: context.user.id,
    role: context.user.role,
    companyId: context.user.companyId!,
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
  authGuard(hasRequiredPermissionsMiddleware('job_status_update', lambda))
);
