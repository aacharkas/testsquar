import { ChangeEmailRequestStatus, PrismaClient } from '@prisma/client';

import * as repository from './repository';

export async function findById(id: string, tx?: PrismaClient) {
  return repository.findById(id, tx);
}

export async function findValidByUserId(userId: string) {
  const activeRequest = await repository.findActiveByUserId(userId);

  if (!activeRequest) {
    return null;
  }

  if (activeRequest.validUntil.getTime() < Date.now()) {
    await repository.updateStatusById(
      activeRequest.id,
      ChangeEmailRequestStatus.TIMED_OUT
    );
    return null;
  }

  return activeRequest;
}
