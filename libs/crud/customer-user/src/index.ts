import { Prisma } from '@prisma/client';

import * as repository from './lib/repository';

export async function findMany(args: Prisma.CustomerUserFindManyArgs) {
  return repository.findMany(args);
}
