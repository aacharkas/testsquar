import { gql } from '@apollo/client';

import { GET_MEMBERS_API, MEMBER_API } from './Members.constants';
import { MEMBERS } from './Members.fragments';

export const GET_MEMBERS = gql`
  query GET_MEMBERS {
    members(search: $search, roles: $roles, statuses: $statuses, take: $take, skip: $skip, sortOrder:$sortOrder, sortCol:$sortCol, companyId:$companyId)
    @rest(method: "GET" type: "Members" path: "${GET_MEMBERS_API}?{args}") {
      ...MEMBERS
    }
  }
  ${MEMBERS}
`;

export const CHANGE_MEMBER_STATUS = gql`
  mutation CHANGE_MEMBER_STATUS {
    change_status(input:$input, uuid: $uuid)
      @rest(method: "PUT", type: NoResponse, path: "${MEMBER_API}/{args.uuid}/status") {
        NoResponse
    }
  }
`;
