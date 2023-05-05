import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function update(
  args: Prisma.JobLineItemUpdateArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.jobLineItem.update(args);
}
