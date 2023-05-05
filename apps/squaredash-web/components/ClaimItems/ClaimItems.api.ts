import { gql } from '@apollo/client';

import { CLAIM_ITEMS_API } from './ClaimItems.contants';
import { CLAIM_ITEMS } from './ClaimItems.fragments';

export const GET_CLAIM_ITEMS = gql`
  query GET_CLAIM_ITEMS {
    claimItems(search: $search, take: $take, skip: $skip, sortOrder:$sortOrder, reviewed:$reviewed, sources:$sources)
    @rest(method: "GET" type: "ClaimItems" path: "${CLAIM_ITEMS_API}?{args}") {
      ...CLAIM_ITEMS
    }
  }
  ${CLAIM_ITEMS}
`;
