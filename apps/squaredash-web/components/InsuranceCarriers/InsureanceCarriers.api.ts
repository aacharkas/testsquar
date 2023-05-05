import { gql } from '@apollo/client';

import { INSURANCE_CARRIES_API } from './InsuranceCarriers.constants';
import { INSURANCE_CARRIES } from './InsuranceCarriers.fragments';

export const GET_INSURANCE_CARRIES = gql`
  query GET_INSURANCE_CARRIES {
    insuranceCarriers(search: $search, take: $take, skip: $skip, sortOrder:$sortOrder, sortCol:$sortCol)
    @rest(method: "GET" type: "InsuranceCarries" path: "${INSURANCE_CARRIES_API}?{args}") {
      ...INSURANCE_CARRIES
    }
  }
  ${INSURANCE_CARRIES}
`;
