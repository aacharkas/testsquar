import { ClaimItem, Prisma, PrismaClient } from '@prisma/client';

import { SORT_ORDER } from '@squaredash/shared/constants';
import { PRISMA_ERROR } from '@squaredash/shared/constants';
import { prisma } from '@squaredash/shared/db';
import { BadRequestException } from '@squaredash/shared/util';

import {
  claimItemsListWithSearchCountQueryFactory,
  claimItemsListWithSearchQueryFactory,
} from './lib/repository';
import * as claimItemRepository from './lib/repository';

export function update(
  where: Prisma.ClaimItemWhereUniqueInput,
  data: Prisma.ClaimItemUpdateInput,
  tx?: Prisma.TransactionClient
) {
  return claimItemRepository.update(where, data, tx);
}

export function remove(where: Prisma.ClaimItemWhereUniqueInput) {
  return claimItemRepository.remove(where);
}

export function find(where: Prisma.ClaimItemWhereInput, tx?: PrismaClient) {
  return claimItemRepository.find(where, tx);
}

export async function create(
  data: Prisma.ClaimItemCreateInput,
  tx?: PrismaClient
) {
  try {
    return await claimItemRepository.create(data, tx);
  } catch (err) {
    handleUniqueConstraintError(err);
  }
}

export async function count(args: Prisma.ClaimItemFindManyArgs) {
  return claimItemRepository.count(args);
}

function handleUniqueConstraintError(error: any): never {
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === PRISMA_ERROR.UNIQUE_CONSTRAINT_FAILED
  ) {
    const message = error.message;

    if (message.includes('description')) {
      throw new BadRequestException('IM0038');
    }
  }

  throw error;
}

export async function list(queryParameters: {
  search?: string;
  take: number;
  skip: number;
  sortOrder: SORT_ORDER;
  filters: { reviewed: boolean; sources: string[] };
}): Promise<[ClaimItem[], number]> {
  const [claimItems, [{ count }]]: [ClaimItem[], [{ count: number }]] =
    await prisma.$transaction([
      prisma.$queryRawUnsafe(
        claimItemsListWithSearchQueryFactory(queryParameters),
        queryParameters.search || '',
        queryParameters.filters.sources || '',
        queryParameters.filters.reviewed ?? '',
        queryParameters.take,
        queryParameters.skip
      ),
      prisma.$queryRawUnsafe(
        claimItemsListWithSearchCountQueryFactory(queryParameters),
        queryParameters.search || '',
        queryParameters.filters.sources || '',
        queryParameters.filters.reviewed ?? ''
      ),
    ]);

  return [claimItems, count];
}
