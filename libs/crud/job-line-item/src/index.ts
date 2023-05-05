import { Prisma, PrismaClient } from '@prisma/client';

import * as repository from './lib/repository';

export async function update(
  args: Prisma.JobLineItemUpdateArgs,
  tx?: PrismaClient
) {
  return repository.update(args, tx);
}
