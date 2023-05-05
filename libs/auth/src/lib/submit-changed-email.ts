import {
  ChangeEmailRequestStatus,
  PrismaClient,
  TokenType,
} from '@prisma/client';

import * as changeEmailRequestsService from '@squaredash/change-email-request';
import { ChangeEmailRequestNotFound } from '@squaredash/change-email-request';
import * as tokensCrud from '@squaredash/crud/token';
import * as usersCrud from '@squaredash/crud/user';
import * as userChangeLogCrud from '@squaredash/crud/user-change-log';
import { prisma } from '@squaredash/shared/db';
import { TemplateIds, sendMail } from '@squaredash/shared/util';
import { WrongPasswordError } from '@squaredash/user';

import { LinkIsInvalidError } from './errors';
import { SubmitChangedEmail } from './interfaces';
import { comparePassword } from './sign-in';

export async function submitChangedEmail(payload: SubmitChangedEmail) {
  return prisma.$transaction(async (tx) => {
    const transaction = tx as PrismaClient;

    const changeEmailRequest = await changeEmailRequestsService.findById(
      payload.token,
      transaction
    );

    if (!changeEmailRequest) {
      throw new ChangeEmailRequestNotFound();
    }

    if (changeEmailRequest.status !== ChangeEmailRequestStatus.USED) {
      throw new LinkIsInvalidError();
    }

    if (changeEmailRequest.validUntil.getTime() < Date.now()) {
      await changeEmailRequestsService.updateStatusById(
        changeEmailRequest.id,
        ChangeEmailRequestStatus.TIMED_OUT
      );

      throw new LinkIsInvalidError();
    }

    const user = (await usersCrud.findWithPassword(
      {
        id: changeEmailRequest.userId,
      },
      transaction
    ))!;

    if (!comparePassword(payload.password, user.password!)) {
      throw new WrongPasswordError();
    }

    const oldEmail = user.email;
    const updatedUser = await usersCrud.update(
      {
        id: user.id,
      },
      { email: changeEmailRequest.newEmail },
      transaction
    );

    await sendMail({
      recipient: oldEmail,
      template: {
        id: TemplateIds.emailWasChanged,
      },
    });

    await changeEmailRequestsService.updateStatusById(
      changeEmailRequest.id,
      ChangeEmailRequestStatus.COMPLETED,
      transaction
    );

    await tokensCrud.deleteMany({
      userId: user.id,
      type: TokenType.REFRESH,
    });

    await userChangeLogCrud.create(
      {
        content: {
          email: {
            new: changeEmailRequest.newEmail,
            old: oldEmail,
          },
        },
        createdBy: changeEmailRequest.createdById,
        user: {
          connect: {
            id: changeEmailRequest.userId,
          },
        },
      },
      transaction
    );

    return updatedUser;
  });
}
