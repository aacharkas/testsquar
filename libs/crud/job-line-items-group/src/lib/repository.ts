import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function create(
  args: Prisma.JobLineItemsGroupInfoCreateArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.jobLineItemsGroupInfo.create(args);
}
