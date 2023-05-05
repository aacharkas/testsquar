import { Prisma } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function create(args: Prisma.JobContractCreateArgs) {
  return prisma.jobContract.create(args);
}

export async function findUnique(args: Prisma.JobContractFindUniqueArgs) {
  return prisma.jobContract.findUnique(args);
}

export async function findMany(args: Prisma.JobContractFindManyArgs) {
  return prisma.jobContract.findMany(args);
}

export async function update(args: Prisma.JobContractUpdateArgs) {
  return prisma.jobContract.update(args);
}
