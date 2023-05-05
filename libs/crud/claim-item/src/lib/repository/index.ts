import { Prisma, PrismaClient, TechStatus } from '@prisma/client';

import { SORT_ORDER } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';

export function create(data: Prisma.ClaimItemCreateInput, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.claimItem.create({ data });
}

export function update(
  where: Prisma.ClaimItemWhereUniqueInput,
  data: Prisma.ClaimItemUpdateInput,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;
  return client.claimItem.update({ where, data });
}

export function updateMany(
  where: Prisma.ClaimItemWhereInput,
  data: Prisma.ClaimItemUpdateInput,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;
  return client.claimItem.updateMany({ where, data });
}

export function remove(where: Prisma.ClaimItemWhereUniqueInput) {
  return prisma.claimItem.update({
    where,
    data: {
      techStatus: TechStatus.DELETED,
    },
  });
}

export function find(where: Prisma.ClaimItemWhereInput, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.claimItem.findFirst({
    where: {
      ...where,
      techStatus: {
        not: TechStatus.DELETED,
      },
    },
  });
}

const claimItemsListBaseQueryFactory = (queryParameters: {
  search?: string;
  sortOrder: SORT_ORDER;
  filters: { reviewed?: boolean; sources?: string[] };
}) => `
  SELECT CI."id",
         CI."description",
         CI."source",
         CI."techStatus",
         CI."createdAt",
         CI."updatedAt",
         CI."reviewed"
  FROM "ClaimItem" AS CI
  WHERE
    CI."techStatus" != '${TechStatus.DELETED}'
    ${getSearchQuery(queryParameters)}
    ${getFilterBySource(queryParameters)}
    ${getFilterByReviewed(queryParameters)}
    ${getOrderByQuery(queryParameters)}
`;

function getOrderByQuery(queryParameters: { sortOrder: SORT_ORDER }): string {
  return `
    ORDER BY description ${
      queryParameters.sortOrder === SORT_ORDER.ASC
        ? SORT_ORDER.ASC
        : SORT_ORDER.DESC
    }
  `;
}

export const claimItemsListWithSearchCountQueryFactory = (queryParameters: {
  search?: string;
  sortOrder: SORT_ORDER;
  filters: { reviewed: boolean; sources: string[] };
}) => `
  SELECT COUNT(*)::INTEGER as "count"
  FROM (${claimItemsListBaseQueryFactory(queryParameters)}) AS "source";
`;

export const claimItemsListWithSearchQueryFactory = (queryParameters: {
  search?: string;
  sortOrder: SORT_ORDER;
  filters: { reviewed: boolean; sources: string[] };
}) => `
  ${claimItemsListBaseQueryFactory(queryParameters)}
  LIMIT $4 OFFSET $5
`;

function getSearchQuery(queryParameters: { search?: string }): string {
  return queryParameters.search
    ? `AND (levenshtein(LOWER(CI."description"), LOWER($1)) <= 1 OR LOWER(CI."description") LIKE '%' || LOWER($1) || '%')`
    : '';
}

function getFilterBySource(queryParameters: {
  filters: { sources?: string[] };
}): string {
  return queryParameters.filters.sources?.length
    ? 'AND CI."source"::TEXT ILIKE ANY ($2)'
    : '';
}

function getFilterByReviewed(queryParameters: {
  filters: { reviewed?: boolean };
}): string {
  return queryParameters.filters.reviewed !== undefined
    ? 'AND CI."reviewed" = $3'
    : '';
}

export function count(args: Prisma.ClaimItemFindManyArgs) {
  const where: Prisma.ClaimItemWhereInput = {
    ...args.where,
    techStatus: {
      not: TechStatus.DELETED,
    },
  };

  return prisma.claimItem.count({ where });
}
