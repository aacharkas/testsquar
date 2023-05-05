import {
  ClaimItemSource,
  Prisma,
  PrismaClient,
  TechStatus,
} from '@prisma/client';

import * as claimItemsCrud from '@squaredash/crud/claim-item';

import { InsuranceScopeLineItemDraft } from './lib/models/insurance-scope-line-item';
import * as repository from './lib/repository';

export async function create(
  data: Prisma.InsuranceScopeLineItemDraftCreateInput
): Promise<InsuranceScopeLineItemDraft> {
  return repository.create(data);
}

export async function update(
  where: Prisma.InsuranceScopeLineItemDraftWhereUniqueInput,
  data: Prisma.InsuranceScopeLineItemDraftUpdateInput
): Promise<InsuranceScopeLineItemDraft> {
  return repository.update(where, data);
}

export async function deleteItem(
  where: Prisma.InsuranceScopeLineItemDraftWhereUniqueInput
): Promise<void> {
  return repository.deleteItem(where);
}

export async function deleteMany(
  where: Prisma.InsuranceScopeLineItemDraftWhereInput,
  tx?: PrismaClient
): Promise<void> {
  return repository.deleteMany(where, tx);
}

export async function createMany(
  data: Prisma.InsuranceScopeLineItemDraftCreateManyInput,
  tx?: PrismaClient
): Promise<void> {
  return repository.createMany(data, tx);
}

export async function saveByInsuranceScopeId(
  insuranceScopeId: string,
  tx?: PrismaClient
) {
  const lineItems = await repository.findByInsuranceScopeId(
    insuranceScopeId,
    tx
  );

  const savedItems = [];
  for (const lineItem of lineItems) {
    savedItems.push(await saveById(lineItem.id, tx));
  }

  return savedItems;
}

export async function saveById(id: string, tx?: PrismaClient) {
  const draftClaimItem = await repository.findById(id, tx);

  if (!draftClaimItem) {
    return null;
  }

  const existingClaimItem = await claimItemsCrud.find(
    {
      description: draftClaimItem.description,
    },
    tx
  );

  if (existingClaimItem) {
    return repository.connectClaimItem(id, existingClaimItem.id, tx);
  }

  const createdClaimItem = await claimItemsCrud.create(
    {
      description: draftClaimItem.description,
      source: ClaimItemSource.OTHER,
      reviewed: false,
      techStatus: TechStatus.ACTIVE,
    },
    tx
  );
  return repository.connectClaimItem(id, createdClaimItem.id, tx);
}
