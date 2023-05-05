import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export function create(
  data: Prisma.UserChangeLogCreateInput,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.userChangeLog.create({ data });
}
