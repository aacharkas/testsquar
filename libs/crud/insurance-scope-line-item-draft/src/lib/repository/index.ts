import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { InsuranceScopeLineItemDraft } from '../models/insurance-scope-line-item';

export async function create(
  data: Prisma.InsuranceScopeLineItemDraftCreateInput
): Promise<InsuranceScopeLineItemDraft> {
  return prisma.insuranceScopeLineItemDraft.create({ data });
}

export async function update(
  where: Prisma.InsuranceScopeLineItemDraftWhereUniqueInput,
  data: Prisma.InsuranceScopeLineItemDraftUpdateInput
): Promise<InsuranceScopeLineItemDraft> {
  return prisma.insuranceScopeLineItemDraft.update({ where, data });
}

export async function deleteItem(
  where: Prisma.InsuranceScopeLineItemDraftWhereUniqueInput
): Promise<void> {
  await prisma.insuranceScopeLineItemDraft.delete({ where });
}

export async function deleteMany(
  where: Prisma.InsuranceScopeLineItemDraftWhereInput,
  tx?: PrismaClient
): Promise<void> {
  const client = tx || prisma;
  await client.insuranceScopeLineItemDraft.deleteMany({ where });
}

export async function createMany(
  data: Prisma.InsuranceScopeLineItemDraftCreateManyInput,
  tx?: PrismaClient
): Promise<void> {
  const client = tx || prisma;
  await client.insuranceScopeLineItemDraft.createMany({ data });
}

export async function findById(id: string, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.insuranceScopeLineItemDraft.findUnique({ where: { id } });
}

export async function findByInsuranceScopeId(
  insuranceScopeDraftId: string,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.insuranceScopeLineItemDraft.findMany({
    where: { insuranceScopeDraftId },
  });
}

export async function connectClaimItem(
  draftId: string,
  claimItemId: string,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;
  return executor.insuranceScopeLineItemDraft.update({
    where: {
      id: draftId,
    },
    data: {
      claimItemId,
    },
    include: {
      claimItem: true,
    },
  });
}
