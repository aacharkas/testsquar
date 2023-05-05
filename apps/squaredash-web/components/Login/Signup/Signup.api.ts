import { gql } from '@apollo/client';

import { SIGNUP_API } from './Signup.constants';

export const SIGN_UP = gql`
  mutation SIGN_UP {
    signUp(input: $input)
      @rest(method: "POST", type: NoResponse, path: "${SIGNUP_API}") {
        accessToken
        refreshToken
    }
  }
`;
