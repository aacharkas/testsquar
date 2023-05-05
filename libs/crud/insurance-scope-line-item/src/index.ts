import { Prisma, PrismaClient } from '@prisma/client';

import * as repository from './lib/repository';

export async function createMany(
  args: Prisma.InsuranceScopeLineItemCreateManyArgs,
  tx?: PrismaClient
) {
  return repository.createMany(args, tx);
}
