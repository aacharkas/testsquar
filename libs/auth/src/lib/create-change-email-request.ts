import * as changeEmailRequestsService from '@squaredash/change-email-request';
import * as customersUsersService from '@squaredash/customer-user';
import { ProvidedEmailIsAlreadyInUseError } from '@squaredash/customer-user';
import { Config, TemplateIds, sendMail } from '@squaredash/shared/util';
import * as usersService from '@squaredash/user';
import { UserNotFoundError } from '@squaredash/user';

import { ChangeEmailByIdPayload } from './interfaces/change-email-by-id-payload';

export const changeEmailById = async (payload: ChangeEmailByIdPayload) => {
  const existingUser = await usersService.getById(payload.userId);

  if (!existingUser) {
    throw new UserNotFoundError();
  }

  if (await customersUsersService.isEmailInUse(payload.newEmail)) {
    throw new ProvidedEmailIsAlreadyInUseError();
  }

  const createdRequest = await changeEmailRequestsService.create(payload);

  const confirmationUrl = `https://${Config.APP.url}/en/login/signin?token=${createdRequest.id}`;
  await sendMail({
    recipient: payload.newEmail,
    template: {
      id: TemplateIds.changeEmail,
      data: {
        confirmationUrl,
      },
    },
  });
};
