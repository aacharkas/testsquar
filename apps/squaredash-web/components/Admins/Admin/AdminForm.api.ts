import { gql } from '@apollo/client';

import { ADMIN_API } from '../Admins.constants';
import { INVITE_ADMIN_API } from './AdminForm.constants';
import { ADMIN } from './AdminForm.fragments';

export const GET_ADMIN = gql`
  query GET_ADMIN($uuid:String!) {
    get_admin(uuid:$uuid) @rest(method: "GET" type: "Admin" path: "${ADMIN_API}/{args.uuid}") {
      ...ADMIN
    }
  }
  ${ADMIN}
`;

export const INVITE_ADMIN = gql`
  mutation INVITE_ADMIN {
    invite_admin(input: $input)
      @rest(method: "POST", type: "Admin", path: "${INVITE_ADMIN_API}") {
        ...ADMIN
    }
  }
  ${ADMIN}
`;

export const UPDATE_ADMIN = gql`
  mutation UPDATE_ADMIN {
    update_admin(uuid:$uuid, input: $input)
      @rest(method: "PUT", type: "Admin", path: "${ADMIN_API}/{args.uuid}") {
        ...ADMIN
    }
  }
  ${ADMIN}
`;
