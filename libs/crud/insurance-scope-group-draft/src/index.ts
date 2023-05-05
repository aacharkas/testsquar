import { Prisma, PrismaClient } from '@prisma/client';

import { InsuranceScopeGroupDraft } from './lib/models/insurance-scope-group-draft';
import * as repository from './lib/repository';

export async function create(
  data: Prisma.InsuranceScopeGroupDraftCreateInput,
  tx?: PrismaClient
): Promise<InsuranceScopeGroupDraft> {
  return repository.create(data, tx);
}

export async function update(
  where: Prisma.InsuranceScopeGroupDraftWhereUniqueInput,
  data: Prisma.InsuranceScopeGroupDraftUpdateInput
): Promise<InsuranceScopeGroupDraft> {
  return repository.update(where, data);
}

export async function deleteMany(
  where: Prisma.InsuranceScopeGroupDraftWhereInput,
  tx?: PrismaClient
): Promise<void> {
  await repository.deleteMany(where, tx);
}
