import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as authService from '@squaredash/auth';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
  hasRequiredPermissionsMiddleware,
} from '@squaredash/shared/middlewares';
import { ForbiddenException, NotFoundException } from '@squaredash/shared/util';
import * as usersService from '@squaredash/user';

import { UserChangeEmailBody } from './models/user-change-email.body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const body = await validateRequest(event, context);

  await authService.changeEmailById({
    userId: body.userId,
    newEmail: body.email,
    createdById: context.user.id,
  });

  return {
    statusCode: 204,
    headers: {
      'content-type': 'application/json',
    },
    body: null,
  };
};

export async function validateRequest(
  event: APIGatewayEvent,
  context: CustomContext
): Promise<UserChangeEmailBody> {
  const payload = (await transformAndValidate(
    UserChangeEmailBody,
    event.body
  )) as UserChangeEmailBody;

  const user = await usersService.getById(payload.userId);
  if (!user) {
    throw new NotFoundException('User with given id not found');
  }

  if (user.companyId !== context.user.companyId) {
    throw new ForbiddenException(
      'Use can only change email of members, which belong to their company'
    );
  }

  return payload;
}

exports.handler = errorHandlerMiddleware(
  authGuard(hasRequiredPermissionsMiddleware('user_email_change', lambda))
);
