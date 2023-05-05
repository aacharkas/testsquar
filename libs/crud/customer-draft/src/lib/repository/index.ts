import {
  CustomerDraft as CustomerDraftModel,
  Prisma,
  PrismaClient,
} from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { CustomerDraft } from '../models/customer-draft';

export async function create(
  data: Prisma.CustomerDraftCreateInput,
  tx?: PrismaClient
) {
  const client = tx || prisma;
  const model: CustomerDraftModel = await client.customerDraft.create({ data });

  return model;
}

export async function update(
  where: Prisma.CustomerDraftWhereUniqueInput,
  data: Prisma.CustomerDraftUpdateInput
): Promise<CustomerDraft> {
  return prisma.customerDraft.update({ where, data });
}

export async function findById(id: string, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.customerDraft.findUnique({
    where: { id },
    include: { insuranceScopeDraft: true },
  });
}

export async function connectCustomer(
  id: string,
  customerId: string,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.customerDraft.update({
    where: {
      id,
    },
    data: {
      customerId,
    },
    include: {
      customer: true,
    },
  });
}
