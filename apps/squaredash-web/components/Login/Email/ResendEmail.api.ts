import { gql } from '@apollo/client';

import { RESEND_EMAIL_API } from './ResendEmail.constants';

export const RESEND_EMAIL = gql`
  mutation RESEND_EMAIL {
    resend_email(input: {})
      @rest(method: "POST", type: NoResponse, path: "${RESEND_EMAIL_API}") {
      NoResponse
    }
  }
`;
