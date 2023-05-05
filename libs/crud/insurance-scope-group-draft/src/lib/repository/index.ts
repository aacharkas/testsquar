import {
  InsuranceScopeGroupDraft as InsuranceScopeGroupDraftModel,
  Prisma,
  PrismaClient,
} from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { InsuranceScopeGroupDraft } from '../models/insurance-scope-group-draft';

export async function create(
  data: Prisma.InsuranceScopeGroupDraftCreateInput,
  tx?: PrismaClient
): Promise<InsuranceScopeGroupDraft> {
  const client = tx || prisma;
  const model: InsuranceScopeGroupDraftModel =
    await client.insuranceScopeGroupDraft.create({ data });

  return model;
}

export async function update(
  where: Prisma.InsuranceScopeGroupDraftWhereUniqueInput,
  data: Prisma.InsuranceScopeGroupDraftUpdateInput
): Promise<InsuranceScopeGroupDraft> {
  return prisma.insuranceScopeGroupDraft.update({ where, data });
}

export async function deleteMany(
  where: Prisma.InsuranceScopeGroupDraftWhereInput,
  tx?: PrismaClient
): Promise<void> {
  const client = tx || prisma;
  await client.insuranceScopeGroupDraft.deleteMany({ where });
}
