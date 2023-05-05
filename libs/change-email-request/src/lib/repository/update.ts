import { ChangeEmailRequestStatus, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export function cancelRequestsByUserId(userId: string, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.changeEmailRequest.updateMany({
    where: { userId },
    data: { status: ChangeEmailRequestStatus.CANCELLED },
  });
}

export async function updateStatusById(
  id: string,
  status: ChangeEmailRequestStatus,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.changeEmailRequest.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });
}
