import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { InsuranceCarrierAdjusterDraft } from '../models/insurance-carrier-adjuster-draft';

export async function createMany(
  data: Prisma.InsuranceCarrierAdjusterDraftCreateManyInput[],
  tx?: PrismaClient
): Promise<void> {
  const client = tx || prisma;

  await client.insuranceCarrierAdjusterDraft.createMany({ data });
}

export async function update(
  where: Prisma.InsuranceCarrierAdjusterDraftWhereUniqueInput,
  data: Prisma.InsuranceCarrierAdjusterDraftUpdateInput
): Promise<InsuranceCarrierAdjusterDraft> {
  return prisma.insuranceCarrierAdjusterDraft.update({ where, data });
}

export async function create(
  data: Prisma.InsuranceCarrierAdjusterDraftCreateInput
): Promise<InsuranceCarrierAdjusterDraft> {
  return prisma.insuranceCarrierAdjusterDraft.create({ data });
}

export async function deleteAdjuster(
  where: Prisma.InsuranceCarrierAdjusterDraftWhereUniqueInput
): Promise<void> {
  await prisma.insuranceCarrierAdjusterDraft.delete({ where });
}
