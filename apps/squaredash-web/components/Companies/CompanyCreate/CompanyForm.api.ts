import { gql } from '@apollo/client';

import { COMPANY_MUTATION } from '../Companies.fragments';
import { COMPANY_INVITE_API } from './CompanyForm.constants';

export const CREATE_COMPANY = gql`
  mutation CREATE_COMPANY {
    create_company(input: $input)
      @rest(method: "POST", type: "Company", path: "${COMPANY_INVITE_API}") {
        ...COMPANY_MUTATION
    }
  }
  ${COMPANY_MUTATION}
`;
