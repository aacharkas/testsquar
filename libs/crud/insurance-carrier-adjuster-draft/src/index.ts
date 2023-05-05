import { Prisma, PrismaClient } from '@prisma/client';

import { InsuranceCarrierAdjusterDraft } from './lib/models/insurance-carrier-adjuster-draft';
import * as repository from './lib/repository';

export async function update(
  where: Prisma.InsuranceCarrierAdjusterDraftWhereUniqueInput,
  data: Prisma.InsuranceCarrierAdjusterDraftUpdateInput
): Promise<InsuranceCarrierAdjusterDraft> {
  return repository.update(where, data);
}

export async function createMany(
  data: Prisma.InsuranceCarrierAdjusterDraftCreateManyInput[],
  tx?: PrismaClient
): Promise<void> {
  return repository.createMany(data, tx);
}

export async function create(
  data: Prisma.InsuranceCarrierAdjusterDraftCreateInput
): Promise<InsuranceCarrierAdjusterDraft> {
  return repository.create(data);
}

export async function deleteAdjuster(
  where: Prisma.InsuranceCarrierAdjusterDraftWhereUniqueInput
): Promise<void> {
  return repository.deleteAdjuster(where);
}

export * from './lib/models';
