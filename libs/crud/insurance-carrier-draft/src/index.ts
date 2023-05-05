import { Prisma, PrismaClient } from '@prisma/client';

import { InsuranceCarrierDraft } from './lib/models/insurance-carrier-draft';
import * as repository from './lib/repository';

export async function update(
  where: Prisma.InsuranceCarrierDraftWhereUniqueInput,
  data: Prisma.InsuranceCarrierDraftUpdateInput
): Promise<InsuranceCarrierDraft> {
  return repository.update(where, data);
}

export async function create(
  data: Prisma.InsuranceCarrierDraftCreateInput,
  tx?: PrismaClient
): Promise<InsuranceCarrierDraft> {
  return repository.create(data, tx);
}
