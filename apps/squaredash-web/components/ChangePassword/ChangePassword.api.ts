import { gql } from '@apollo/client';

import { CHANGE_PASSWORD_API } from './ChangePassword.constants';

export const CHANGE_PASSWORD = gql`
  mutation CHANGE_PASSWORD {
    changePassword(input: $input)
      @rest(method: "POST", type: "NoResponse", path: "${CHANGE_PASSWORD_API}") {
        NoResponse
    }
  }
`;
