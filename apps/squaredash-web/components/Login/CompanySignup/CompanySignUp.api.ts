import { gql } from '@apollo/client';

import {
  COMPANY_SIGNUP_API,
  VERIFY_EMAIL_API,
} from './CompanySignUp.constants';

export const COMPANY_SIGN_UP = gql`
  mutation COMPANY_SIGN_UP {
    companySignUp(input: $input)
      @rest(method: "POST", type: NoResponse, path: "${COMPANY_SIGNUP_API}") {
      NoResponse
    }
  }
`;

export const UPDATE_COMPANY_ON_SIGN_UP = gql`
  mutation UPDATE_COMPANY_ON_SIGN_UP {
    companySignUp(companyId:$companyId, input: $input)
      @rest(method: "PUT", type: NoResponse, path: "${COMPANY_SIGNUP_API}/:companyId") {
      NoResponse
    }
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VERIFY_EMAIL {
    verify_email(token: $token, input: {}) @rest(method: "POST" type: "Token" path: "${VERIFY_EMAIL_API}?token={args.token}") {
      accessToken
      refreshToken
    }
  }
`;
