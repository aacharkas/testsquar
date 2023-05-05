import { gql } from '@apollo/client';

import { COMPANY_API } from './Companies.constants';
import { COMPANIES } from './Companies.fragments';

export const GET_COMPANIES = gql`
  query GET_COMPANIES {
    companies(search: $search, take: $take, skip: $skip, sortOrder:$sortOrder, sortCol:$sortCol)
      @rest(method: "GET" type: "Companies" path: "${COMPANY_API}?{args}") {
      ...COMPANIES
    }
  }
  ${COMPANIES}
`;

export const CHANGE_COMPANY_STATUS = gql`
  mutation CHANGE_COMPANY_STATUS {
    change_status(input:$input, uuid: $uuid, status: $status)
      @rest(method: "PATCH", type: NoResponse, path: "${COMPANY_API}/{args.uuid}/status") {
        NoResponse
    }
  }
`;
