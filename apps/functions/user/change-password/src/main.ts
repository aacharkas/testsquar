import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as authService from '@squaredash/auth';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import {
  HTTP_STATUS,
  TemplateIds,
  extractToken,
} from '@squaredash/shared/util';
import * as userService from '@squaredash/user';

import { ChangePasswordBody } from './models/change-password-body';

const changePassword = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const body = await validateBody(event.body);
  const user = await userService.getById(context.user.id);

  await userService.changePassword(user.id, body);

  await Promise.all([
    sendPasswordChangeNotification(user.email),
    invalidateUserSessions(event, context),
  ]);

  return {
    statusCode: HTTP_STATUS.OK,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({ message: 'IM0052' }),
  };
};

async function validateBody(body: Object): Promise<ChangePasswordBody> {
  return (await transformAndValidate(ChangePasswordBody, body, {
    validator: { whitelist: true },
  })) as ChangePasswordBody;
}

async function sendPasswordChangeNotification(email: string): Promise<void> {
  await messageQueueService.add(TOPIC.EMAIL_NOTIFICATION, {
    recipient: email,
    templateId: TemplateIds.passwordChangeNotification,
  });
}

async function invalidateUserSessions(
  event: APIGatewayEvent,
  context: CustomContext
): Promise<void> {
  const refreshToken = extractToken(event, authService.REFRESH_TOKEN_NAME);
  await authService.removeRefreshTokenByUserId(context.user.id, refreshToken);
}

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('password_change', changePassword))
);
