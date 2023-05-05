import { Prisma, PrismaClient } from '@prisma/client';

import * as repository from './lib/repository';

export async function findFirst(
  args: Prisma.CustomerFindFirstArgs,
  tx?: PrismaClient
) {
  return repository.findFirst(args, tx);
}
