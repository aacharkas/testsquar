import { gql } from '@apollo/client';

import {
  MEMBER_SIGNUP_API,
  RECIEVE_INVITE_API,
} from './MemberSignUp.constants';

export const MEMBER_SIGN_UP = gql`
  mutation MEMBER_SIGN_UP {
    memberSignUp(input: $input)
      @rest(method: "POST", type: "MemberSignUp", path: "${MEMBER_SIGNUP_API}") {
      accessToken
      refreshToken
    }
  }
`;

export const VERIFY_INVITE = gql`
  mutation VERIFY_INVITE {
    verify_invite(token: $token, input: {}) @rest(method: "POST" type: "Token" path: "${RECIEVE_INVITE_API}?token={args.token}") {
      action
    }
  }
`;
