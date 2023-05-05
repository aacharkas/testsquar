import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function find(
  where: Prisma.UserWhereUniqueInput,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;
  return executor.company.findUnique({ where });
}

export async function update(
  where: Prisma.CompanyWhereUniqueInput,
  data: Prisma.CompanyUpdateInput
) {
  return prisma.company.update({ where, data });
}
