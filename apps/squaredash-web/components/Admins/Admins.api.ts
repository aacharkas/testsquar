import { gql } from '@apollo/client';

import { ADMIN_API, GET_ADMINS_API } from './Admins.constants';
import { ADMINS } from './Admins.fragments';

export const GET_ADMINS = gql`
  query GET_ADMINS {
    admins(search: $search, take: $take, skip: $skip, sortOrder:$sortOrder, sortCol:$sortCol)
      @rest(method: "GET" type: "Admins" path: "${GET_ADMINS_API}?{args}") {
      ...ADMINS
    }
  }
  ${ADMINS}
`;

export const DELETE_ADMIN = gql`
  mutation DELETE_ADMIN($uuid:String!) {
    delete_admin(uuid:$uuid)
      @rest(method: "DELETE" type: "Admin" path: "${ADMIN_API}/{args.uuid}") {
        NoResponse
    }
  }
`;
