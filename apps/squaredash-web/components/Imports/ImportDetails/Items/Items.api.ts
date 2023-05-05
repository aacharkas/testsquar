import { gql } from '@apollo/client';

import { IMPORT_DETAILS_API } from '../ImportDetails.constants';
import { GROUP, GROUP_ITEM } from '../ImportDetails.fragments';
import { UOM_API } from './Items.constants';

export const CREATE_IMPORT_GROUP = gql`
  mutation CREATE_IMPORT_GROUP {
    createImportGroup(scopeId:$scopeId, input:$input)
      @rest(method: "POST", type: "Group", path: "${IMPORT_DETAILS_API}/{args.scopeId}/groups") {
        ...GROUP
    }
  }
  ${GROUP}
`;

export const UPDATE_IMPORT_GROUP = gql`
  mutation UPDATE_IMPORT_GROUP {
    updateImportGroup(scopeId:$scopeId, uuid:$uuid, input:$input)
      @rest(method: "PUT", type: "Group", path: "${IMPORT_DETAILS_API}/{args.scopeId}/groups/{args.uuid}") {
        ...GROUP
    }
  }
  ${GROUP}
`;

export const DELETE_IMPORT_GROUP = gql`
  mutation DELETE_IMPORT_GROUP {
    deleteImportGroup(scopeId:$scopeId, uuid:$uuid, input:$input)
      @rest(method: "DELETE", type: "Group", path: "${IMPORT_DETAILS_API}/{args.scopeId}/groups/{args.uuid}") {
        ...GROUP
    }
  }
  ${GROUP}
`;

export const CREATE_IMPORT_LINE_ITEM = gql`
  mutation CREATE_IMPORT_LINE_ITEM {
    createImportLineItem(scopeId:$scopeId, groupId:$groupId, input:$input)
      @rest(method: "POST", type: "GroupItem", path: "${IMPORT_DETAILS_API}/{args.scopeId}/groups/{args.groupId}/items") {
        ...GROUP_ITEM
    }
  }
  ${GROUP_ITEM}
`;

export const UPDATE_IMPORT_LINE_ITEM = gql`
  mutation UPDATE_IMPORT_LINE_ITEM {
    updateImportLineItem(scopeId:$scopeId, groupId:$groupId, uuid:$uuid, input:$input)
      @rest(method: "PUT", type: "GroupItem", path: "${IMPORT_DETAILS_API}/{args.scopeId}/groups/{args.groupId}/items/{args.uuid}") {
        ...GROUP_ITEM
    }
  }
  ${GROUP_ITEM}
`;

export const DELETE_IMPORT_LINE_ITEM = gql`
  mutation DELETE_IMPORT_LINE_ITEM {
    deleteImportLineItem(scopeId:$scopeId, groupId:$groupId, uuid:$uuid, input:$input)
      @rest(method: "DELETE", type: "GroupItem", path: "${IMPORT_DETAILS_API}/{args.scopeId}/groups/{args.groupId}/items/{args.uuid}") {
        ...GROUP_ITEM
    }
  }
  ${GROUP_ITEM}
`;

export const GET_UOMS = gql`
  query GET_UOMS {
    uoms(search: $search)
    @rest(method: "GET" type: "UoMs" path: "${UOM_API}?{args}") {
      rows {
        id
        abbreviation
      }
    }
  }
`;
