import {
  InsuranceCarrierDraft as InsuranceCarrierDraftModel,
  Prisma,
  PrismaClient,
} from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { InsuranceCarrierDraft } from '../models/insurance-carrier-draft';

export async function create(
  data: Prisma.InsuranceCarrierDraftCreateInput,
  tx?: PrismaClient
) {
  const client = tx || prisma;
  const model: InsuranceCarrierDraftModel =
    await client.insuranceCarrierDraft.create({ data });

  return model;
}

export async function update(
  where: Prisma.InsuranceCarrierDraftWhereUniqueInput,
  data: Prisma.InsuranceCarrierDraftUpdateInput
): Promise<InsuranceCarrierDraft> {
  return prisma.insuranceCarrierDraft.update({ where, data });
}
