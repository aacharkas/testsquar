import { ChangeEmailRequestStatus, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function findById(id: string, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.changeEmailRequest.findUnique({ where: { id } });
}

export async function findActiveByUserId(userId: string) {
  return prisma.changeEmailRequest.findFirst({
    where: { userId, status: ChangeEmailRequestStatus.ACTIVE },
  });
}
