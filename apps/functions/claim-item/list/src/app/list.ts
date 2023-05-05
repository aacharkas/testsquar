import { ClaimItem } from '@prisma/client';

import * as claimItemCrud from '@squaredash/crud/claim-item';
import { List } from '@squaredash/shared/interfaces';

import { ListClaimItemsQuery } from '../models/list-claim-items-query';

export async function list(
  query: ListClaimItemsQuery
): Promise<List<ClaimItem> & { suggestionCount: number }> {
  const [rows, totalCount] = await claimItemCrud.list({
    search: query.search,
    skip: query.skip,
    take: query.take,
    sortOrder: query.sortOrder,
    filters: {
      sources: query.sources?.length ? query.sources : undefined,
      reviewed: query.reviewed ?? undefined,
    },
  });
  const suggestionCount = await claimItemCrud.count({
    where: { reviewed: false },
  });

  return { rows, totalCount, suggestionCount };
}
