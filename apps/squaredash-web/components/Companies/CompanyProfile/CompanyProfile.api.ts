import { gql } from '@apollo/client';

import { COMPANY_API } from '../Companies.constants';
import { COMPANY_MUTATION } from '../Companies.fragments';
import { GET_USER_API } from './CompanyProfile.constants';
import { COMPANY, USER } from './CompanyProfile.fragments';

export const GET_USER = gql`
  query GET_USER {
    get_user @rest(method: "GET" type: "User" path: "${GET_USER_API}") {
      ...USER
    }
  }
  ${USER}
`;

export const GET_COMPANY = gql`
  query GET_COMPANY {
    get_company(companyId:$companyId)
      @rest(method: "GET" type: "Company" path: "${COMPANY_API}/:companyId") {
      ...COMPANY
    }
  }
  ${COMPANY}
`;

export const UPDATE_COMPANY = gql`
  mutation UPDATE_COMPANY {
    update_company(companyId:$companyId, input:$input)
      @rest(method: "PUT", type: "Company", path: "${COMPANY_API}/:companyId") {
        ...COMPANY_MUTATION
    }
  }
  ${COMPANY_MUTATION}
`;
