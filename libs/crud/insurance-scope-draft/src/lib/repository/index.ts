import { Prisma, PrismaClient } from '@prisma/client';

import { InsuranceScopeDraft } from '@squaredash/crud/insurance-scope-draft';
import { prisma } from '@squaredash/shared/db';

export async function create(
  data: Prisma.InsuranceScopeDraftCreateInput,
  tx?: PrismaClient
) {
  const client = tx || prisma;

  return client.insuranceScopeDraft.create({ data });
}

export async function update(
  where: Prisma.InsuranceScopeDraftWhereUniqueInput,
  data: Prisma.InsuranceScopeDraftUpdateInput,
  tx?: PrismaClient
): Promise<InsuranceScopeDraft> {
  const executor = tx ?? prisma;

  return executor.insuranceScopeDraft.update({ where, data });
}

export async function findUnique(
  args: Prisma.InsuranceScopeDraftFindUniqueArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.insuranceScopeDraft.findUnique(args);
}

export async function deleteById(id: string, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.insuranceScopeDraft.delete({ where: { id } });
}
