import { Prisma, PrismaClient } from '@prisma/client';

import * as repository from './lib/repository';

export async function create(
  args: Prisma.JobLineItemsGroupInfoCreateArgs,
  tx?: PrismaClient
) {
  return repository.create(args, tx);
}
