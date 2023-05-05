import { Prisma, PrismaClient } from '@prisma/client';

import * as repository from './repository';

export function create(
  data: Prisma.UserChangeLogCreateInput,
  tx?: PrismaClient
) {
  return repository.create(data, tx);
}
