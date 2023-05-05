import { gql } from '@apollo/client';

import { CUSTOMERS_API } from './Customers.constants';
import { CUSTOMERS } from './Customers.fragments';

export const GET_CUSTOMERS = gql`
  query GET_CUSTOMERS {
    customers(category: $category, search: $search, types: $types, parents: $parents, responsibleMembers: $responsibleMembers, take: $take, skip: $skip, sortOrder:$sortOrder, sortCol:$sortCol)
      @rest(method: "GET" type: "Customers" path: "${CUSTOMERS_API}?{args}") {
      ...CUSTOMERS
    }
  }
  ${CUSTOMERS}
`;
