import { Prisma } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function findMany(args: Prisma.CustomerUserFindManyArgs) {
  return prisma.customerUser.findMany(args);
}
