import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function createJobHistoryEvent(
  args: Prisma.JobHistoryEventCreateArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.jobHistoryEvent.create(args);
}
