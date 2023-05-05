import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function createMany(
  args: Prisma.InsuranceScopeLineItemCreateManyArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.insuranceScopeLineItem.createMany(args);
}
