import { Prisma } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function create(
  args: Prisma.InsuranceScopeValidationRunCreateArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.insuranceScopeValidationRun.create(args);
}

export async function findMany(
  args: Prisma.InsuranceScopeValidationRunFindManyArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.insuranceScopeValidationRun.findMany(args);
}

export async function remove(
  insuranceScopeId: string,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.insuranceScopeValidationRun.deleteMany({
    where: {
      insuranceScopeDraftId: insuranceScopeId,
    },
  });
}

export async function update(
  where: Prisma.InsuranceScopeValidationRunWhereUniqueInput,
  data: Prisma.InsuranceScopeValidationRunUpdateInput,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.insuranceScopeValidationRun.update({
    where,
    data,
  });
}
