import { Prisma } from '@prisma/client';

import * as repository from './lib/repository';

export async function create(args: Prisma.JobContractCreateArgs) {
  return repository.create(args);
}

export async function findUnique(args: Prisma.JobContractFindUniqueArgs) {
  return repository.findUnique(args);
}

export async function findMany(args: Prisma.JobContractFindManyArgs) {
  return repository.findMany(args);
}

export async function update(args: Prisma.JobContractUpdateArgs) {
  return repository.update(args);
}
