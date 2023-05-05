import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function create(
  args: Prisma.JobInsuranceCarrierInfoCreateArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.jobInsuranceCarrierInfo.create(args);
}
