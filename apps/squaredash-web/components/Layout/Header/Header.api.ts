import { gql } from '@apollo/client';

import { GET_USER_API, LOGOUT_API } from './Header.constants';
import { USER } from './Header.fragments';

export const GET_USER = gql`
  query GET_USER {
    get_user @rest(method: "GET" type: "User" path: "${GET_USER_API}") {
      ...USER
    }
  }
  ${USER}
`;

export const LOG_OUT = gql`
  mutation LOG_OUT {
    logOut(input: {})
      @rest(method: "POST", type: NoResponse, path: "${LOGOUT_API}") {
      NoResponse
    }
  }
`;
