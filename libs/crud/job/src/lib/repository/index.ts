import { Prisma, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';
import { List } from '@squaredash/shared/interfaces';

import { JobListItem } from '../models/JobListItem';
import { JobListParams } from '../models/JobListParams';
import { JobListQueryResult } from '../models/JobListQueryResult';
import {
  jobListCountQueryFactory,
  jobListQueryFactory,
} from '../queries/jobListQueryFactory';

export async function findMany(
  searchParams: JobListParams
): Promise<List<JobListItem>> {
  const query = jobListQueryFactory(searchParams);
  const countQuery = jobListCountQueryFactory(searchParams);

  const [rows, [countResult]]: [
    JobListQueryResult[],
    [{ totalCount: number }]
  ] = await prisma.$transaction([
    prisma.$queryRawUnsafe(
      query,
      searchParams.search || '',
      searchParams.responsibleUserId || '',
      searchParams.filter.companyIds || '',
      searchParams.filter.customerIds || '',
      searchParams.filter.insuranceCarrierIds || '',
      searchParams.filter.statuses || '',
      searchParams.filter.dateOfLossFrom || '',
      searchParams.filter.dateOfLossTo || new Date().toISOString(),
      searchParams.filter.createdFrom || '',
      searchParams.filter.createdTo || new Date().toISOString(),
      searchParams.filter.loanFrom || 0,
      searchParams.filter.loanTo || 0,
      searchParams.filter.dueBalanceFrom || 0,
      searchParams.filter.dueBalanceTo || 0,
      searchParams.take,
      searchParams.skip
    ),
    prisma.$queryRawUnsafe(
      countQuery,
      searchParams.search || '',
      searchParams.responsibleUserId || '',
      searchParams.filter.companyIds || '',
      searchParams.filter.customerIds || '',
      searchParams.filter.insuranceCarrierIds || '',
      searchParams.filter.statuses || '',
      searchParams.filter.dateOfLossFrom || '',
      searchParams.filter.dateOfLossTo || new Date().toISOString(),
      searchParams.filter.createdFrom || '',
      searchParams.filter.createdTo || new Date().toISOString(),
      searchParams.filter.loanFrom || 0,
      searchParams.filter.loanTo || 0,
      searchParams.filter.dueBalanceFrom || 0,
      searchParams.filter.dueBalanceTo || 0,
      searchParams.take,
      searchParams.skip
    ),
  ]);

  return {
    rows: rows,
    totalCount: countResult.totalCount,
  };
}

export async function create(args: Prisma.JobCreateArgs, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.job.create(args);
}

export async function findUnique(
  args: Prisma.JobFindUniqueArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.job.findUnique(args);
}

export async function update(args: Prisma.JobUpdateArgs, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.job.update(args);
}
