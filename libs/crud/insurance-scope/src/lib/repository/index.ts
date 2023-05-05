import { JobVersionStatus, Prisma, PrismaClient } from '@prisma/client';

import {
  InsuranceScopeListItem,
  InsuranceScopeWithMeta,
} from '@squaredash/crud/insurance-scope';
import { prisma } from '@squaredash/shared/db';
import { List, Nullable } from '@squaredash/shared/interfaces';

import {
  insuranceScopeListItemQueryResultToListItem,
  insuranceScopeWithMetaQueryResultToInsuranceScopeWithMeta,
} from '../mappers';
import { InsuranceScopeListParams } from '../models/InsuranceScopeListParams';
import { InsuranceScopeFindByOptions } from '../models/insurance-scope-find-by-options';
import { InsuranceScopeListQueryResult } from '../models/insurance-scope-list-query-result';
import {
  insuranceScopeFindVersionIdQueryFactory,
  insuranceScopeListCountQueryFactory,
  insuranceScopeListQueryFactory,
} from '../queries/insuranceScopeListQueryFactory';

export async function findById(
  id: string,
  include?: Prisma.InsuranceScopeInclude,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.insuranceScope.findUnique({ where: { id }, include });
}

export async function findByIdWithCustomerResponsibleMembers(id: string) {
  return prisma.insuranceScope.findUnique({
    where: {
      id,
    },
    include: {
      customer: {
        include: {
          responsibleMembers: true,
        },
      },
    },
  });
}

export async function findMany(
  searchParams: InsuranceScopeListParams
): Promise<List<InsuranceScopeListItem>> {
  const query = insuranceScopeListQueryFactory(searchParams);
  const countQuery = insuranceScopeListCountQueryFactory(searchParams);

  const [rows, [countResult]]: [
    InsuranceScopeListQueryResult[],
    [{ totalCount: number }]
  ] = await prisma.$transaction([
    prisma.$queryRawUnsafe(
      query,
      searchParams.search || '',
      searchParams.responsibleUserId || '',
      searchParams.filter.customerIds || '',
      searchParams.filter.insuranceCarrierIds || '',
      searchParams.filter.dateOfLossFrom || '',
      searchParams.filter.dateOfLossTo || new Date().toISOString(),
      searchParams.filter.rcvFrom || 0,
      searchParams.filter.rcvTo || '',
      searchParams.filter.companyIds || '',
      searchParams.filter.createdAtFrom || '',
      searchParams.filter.createdAtTo || '',
      searchParams.filter.status || '',
      searchParams.take,
      searchParams.skip
    ),
    prisma.$queryRawUnsafe(
      countQuery,
      searchParams.search || '',
      searchParams.responsibleUserId || '',
      searchParams.filter.customerIds || '',
      searchParams.filter.insuranceCarrierIds || '',
      searchParams.filter.dateOfLossFrom || '',
      searchParams.filter.dateOfLossTo || new Date().toISOString(),
      searchParams.filter.rcvFrom || 0,
      searchParams.filter.rcvTo || '',
      searchParams.filter.companyIds || '',
      searchParams.filter.createdAtFrom || '',
      searchParams.filter.createdAtTo || '',
      searchParams.filter.status || ''
    ),
  ]);

  return {
    rows: rows.map(insuranceScopeListItemQueryResultToListItem),
    totalCount: countResult.totalCount,
  };
}

export async function findWithMeta(
  where: Prisma.InsuranceScopeViewWhereInput,
  tx?: PrismaClient
): Promise<Nullable<InsuranceScopeWithMeta>> {
  const include: Prisma.InsuranceScopeViewInclude = {
    insuranceCarrier: {
      include: {
        adjusters: true,
      },
    },
    customer: {
      include: {
        customer: {
          include: {
            billingAddress: true,
            shippingAddress: true,
          },
        },
      },
    },
    groups: {
      orderBy: { parentId: 'desc' },
      include: { items: true },
    },
    items: true,
  };

  const executor = tx ?? prisma;
  const result: any = await executor.insuranceScopeView.findFirst({
    include,
    where,
  });
  result.job = await executor.job.findFirst({
    where: {
      insuranceScopeId: result.id,
      versionStatus: JobVersionStatus.SUBMITTED,
    },
    orderBy: {
      createdAt: 'desc',
    },
    take: 1,
  });

  return result
    ? insuranceScopeWithMetaQueryResultToInsuranceScopeWithMeta(result)
    : null;
}

export async function findExistedVersion(
  options: InsuranceScopeFindByOptions
): Promise<Nullable<InsuranceScopeListItem>> {
  const query = insuranceScopeFindVersionIdQueryFactory();

  const [result]: InsuranceScopeListQueryResult[] =
    await prisma.$queryRawUnsafe(
      query,
      options.companyId,
      options.claimNumber,
      options.insuranceCarrierName
    );

  return result ? insuranceScopeListItemQueryResultToListItem(result) : null;
}

export async function findUnique(
  args: Prisma.InsuranceScopeFindUniqueArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.insuranceScope.findUnique(args);
}

export async function create(
  args: Prisma.InsuranceScopeCreateArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.insuranceScope.create(args);
}

export async function update(
  args: Prisma.InsuranceScopeUpdateArgs,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.insuranceScope.update(args);
}
