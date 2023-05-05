import { gql } from '@apollo/client';

import { CLAIM_ITEMS_API } from '../ClaimItems.contants';
import { CLAIM_ITEM_MUTATION } from '../ClaimItems.fragments';

export const CREATE_CLAIM_ITEM = gql`
  mutation CREATE_CLAIM_ITEM {
    createClaimItem(input: $input)
      @rest(method: "POST", type: "ClaimItem", path: "${CLAIM_ITEMS_API}") {
        ...CLAIM_ITEM_MUTATION
    }
  }
  ${CLAIM_ITEM_MUTATION}
`;
export const CLAIM_ITEM_DELETE = gql`
  mutation CLAIM_ITEM_DELETE($uuid:String!) {
    claimItemDelete(uuid:$uuid)
      @rest(method: "DELETE", type: "ClaimItem", path: "${CLAIM_ITEMS_API}/{args.uuid}") {
        NoResponse
    }
  }
`;

export const CLAIM_ITEM_UPDATE = gql`
  mutation CLAIM_ITEM_UPDATE {
    createClaimItem(input:$input, uuid:$uuid)
      @rest(method: "PUT", type: "ClaimItem", path: "${CLAIM_ITEMS_API}/{args.uuid}") {
        ...CLAIM_ITEM_MUTATION
    }
  }
  ${CLAIM_ITEM_MUTATION}
`;
export const SUGGESTION_ADD_TO_GLOBAL = gql`
  mutation SUGGESTION_ADD_TO_GLOBAL{
    addSuggestionToGlobal(input:$input,uuid:$uuid)
      @rest(method: "PATCH", type: "ClaimItem", path: "${CLAIM_ITEMS_API}/{args.uuid}/approve") {
        NoResponse
    }
  }
`;
