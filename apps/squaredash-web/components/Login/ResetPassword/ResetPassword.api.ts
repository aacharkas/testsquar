import { gql } from '@apollo/client';

import { RESET_API } from './ResetPassword.constants';

export const RESET_PASSWORD = gql`
  mutation RESET_PASSWORD {
    resetPassword(input: $input, token: $token)
      @rest(method: "POST", type: NoResponse, path: "${RESET_API}?token={args.token}") {
      NoResponse
    }
  }
`;
