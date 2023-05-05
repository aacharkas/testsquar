import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function create(
  data: Prisma.ChangeEmailRequestCreateInput,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.changeEmailRequest.create({ data });
}
