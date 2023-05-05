import { Prisma } from '@prisma/client';

import * as repository from './repository';

export function deleteMany(where: Prisma.TokenWhereInput) {
  return repository.deleteMany(where);
}
