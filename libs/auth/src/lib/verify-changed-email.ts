import { ChangeEmailRequestStatus } from '@prisma/client';

import * as changeEmailRequestsService from '@squaredash/change-email-request';

import { LinkIsInvalidError } from './errors';

export async function verifyChangedEmail(token: string) {
  const existingRequest = await changeEmailRequestsService.findById(token);

  if (!existingRequest) {
    throw new LinkIsInvalidError();
  }

  if (existingRequest.status !== ChangeEmailRequestStatus.ACTIVE) {
    throw new LinkIsInvalidError();
  }

  if (existingRequest.validUntil.getTime() < Date.now()) {
    await changeEmailRequestsService.updateStatusById(
      existingRequest.id,
      ChangeEmailRequestStatus.TIMED_OUT
    );
    throw new LinkIsInvalidError();
  }

  return changeEmailRequestsService.updateStatusById(
    existingRequest.id,
    ChangeEmailRequestStatus.USED
  );
}
