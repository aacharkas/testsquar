import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import { transformAndValidate } from 'class-transformer-validator';

import * as userCrud from '@squaredash/crud/user';
import * as invitationService from '@squaredash/invitation';
import { getRolePermissionsByRole } from '@squaredash/role';
import { USER_ROLE, User } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import {
  authGuard,
  errorHandlerMiddleware,
} from '@squaredash/shared/middlewares';
import {
  BadRequestException,
  ForbiddenException,
  HTTP_STATUS,
} from '@squaredash/shared/util';

import { InvitationSendBaseBody } from './models/invitation-send-base-body';
import { SendInvitationBody } from './models/invitation-send-body';
import { InviteSuperAdminBody } from './models/invite-super-admin-body';

const lambda = async (
  event: APIGatewayEvent,
  context: CustomContext
): Promise<APIGatewayProxyResult> => {
  const currentUser = await userCrud.find({
    where: {
      id: context.user.id,
    },
  });

  const body = await validateRequest(
    currentUser,
    (await transformAndValidate(
      InvitationSendBaseBody,
      event.body
    )) as InvitationSendBaseBody
  );

  const user = await userCrud.find({ where: { email: body.email } });
  if (user) {
    throw new BadRequestException('IM0022');
  }

  await invitationService.send(currentUser, body);

  return {
    statusCode: HTTP_STATUS.NO_CONTENT,
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({}),
  };
};

function validateRequest(
  invitor: User,
  body: InvitationSendBaseBody
): Promise<InviteSuperAdminBody | SendInvitationBody> {
  const invitorPermissions = getRolePermissionsByRole(invitor.role);

  if (!invitorPermissions[`${body.role.toLowerCase()}_invite`]) {
    throw new ForbiddenException(`Current user can't invite ${body.role}`);
  }

  if (body.role === USER_ROLE.SUPER_ADMIN) {
    return transformAndValidate(
      InviteSuperAdminBody,
      body as InviteSuperAdminBody
    );
  }

  return transformAndValidate(SendInvitationBody, body as SendInvitationBody);
}

exports.handler = errorHandlerMiddleware(authGuard(lambda));
