import { Prisma, PrismaClient } from '@prisma/client';

import * as repository from './lib/repository';

export async function find(
  where: Prisma.CompanyWhereUniqueInput,
  tx?: PrismaClient
) {
  return repository.find(where, tx);
}

export async function update(
  where: Prisma.CompanyWhereUniqueInput,
  data: Prisma.CompanyUpdateInput
) {
  return repository.update(where, data);
}
