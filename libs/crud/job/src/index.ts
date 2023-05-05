import { Prisma, PrismaClient } from '@prisma/client';

import { List } from '@squaredash/shared/interfaces';

import { JobListItem } from './lib/models/JobListItem';
import { JobListParams } from './lib/models/JobListParams';
import * as repository from './lib/repository';

export async function findMany(
  searchParams: JobListParams
): Promise<List<JobListItem>> {
  return repository.findMany(searchParams);
}

export async function create(args: Prisma.JobCreateArgs, tx?: PrismaClient) {
  return repository.create(args, tx);
}

export async function findUnique(
  args: Prisma.JobFindUniqueArgs,
  tx?: PrismaClient
) {
  return repository.findUnique(args, tx);
}

export async function update(args: Prisma.JobUpdateArgs, tx?: PrismaClient) {
  return repository.update(args, tx);
}
