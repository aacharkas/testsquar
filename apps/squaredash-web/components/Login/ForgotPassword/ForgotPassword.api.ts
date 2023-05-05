import { gql } from '@apollo/client';

import { FORGOT_API } from './ForgotPassword.constants';

export const FORGOT_PASSWORD = gql`
  mutation FORGOT_PASSWORD {
    forgotPassword(input: $input)
      @rest(method: "POST", type: NoResponse, path: "${FORGOT_API}") {
      NoResponse
    }
  }
`;
