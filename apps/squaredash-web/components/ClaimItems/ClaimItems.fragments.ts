import { gql } from '@apollo/client';

export const CLAIM_ITEM = gql`
  fragment CLAIM_ITEM on ClaimItem {
    id
    description
    source
  }
`;
export const CLAIM_ITEMS = gql`
  fragment CLAIM_ITEMS on ClaimItems {
    rows
    totalCount
    suggestionCount
  }
`;

export const CLAIM_ITEM_MUTATION = gql`
  fragment CLAIM_ITEM_MUTATION on ClaimItem {
    id
    description
    source
  }
`;
