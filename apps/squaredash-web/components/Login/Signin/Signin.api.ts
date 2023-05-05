import { gql } from '@apollo/client';

import { EMAIL } from './SignIn.fragments';
import {
  CHANGE_EMAIL_API,
  SIGNIN_API,
  VERIFY_EMAIL_API,
} from './Signin.constants';

export const SIGN_IN = gql`
  mutation SIGN_IN {
    signIn(input: $input)
      @rest(method: "POST", type: "Token", path: "${SIGNIN_API}") {
      accessToken
      refreshToken
    }
  }
`;
export const VERIFY_CHANGE_EMAIL = gql`
  mutation VERIFY_CHANGE_EMAIL {
    verify_email(token: $token, input:{}) @rest(method: "POST" type: "Email" path: "${VERIFY_EMAIL_API}?token={args.token}") {
      ...EMAIL
    }
  }
  ${EMAIL}
`;
export const CHANGE_EMAIL = gql`
  mutation CHANGE_EMAIL {
    change_email(input:$input) @rest(method: "POST" type: "Email" path: "${CHANGE_EMAIL_API}") {
      action
    }
  }
`;
