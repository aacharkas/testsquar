import { Prisma, PrismaClient } from '@prisma/client';

import { InsuranceScopeDraft } from './lib/models';
import * as repository from './lib/repository';

export async function create(
  data: Prisma.InsuranceScopeDraftCreateInput,
  tx?: PrismaClient
): Promise<InsuranceScopeDraft> {
  return repository.create(data, tx);
}

export async function update(
  where: Prisma.InsuranceScopeDraftWhereUniqueInput,
  data: Prisma.InsuranceScopeDraftUpdateInput,
  tx?: PrismaClient
): Promise<InsuranceScopeDraft> {
  return repository.update(where, data, tx);
}

export async function findUnique(
  args: Prisma.InsuranceScopeDraftFindUniqueArgs,
  tx?: PrismaClient
) {
  return repository.findUnique(args, tx);
}

export async function deleteById(id: string, tx?: PrismaClient) {
  return repository.deleteById(id, tx);
}

export * from './lib/models';
