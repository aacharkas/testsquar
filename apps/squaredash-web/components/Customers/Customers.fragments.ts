import { gql } from '@apollo/client';

import { CUSTOMER } from './Customer/CustomerForm.fragments';

export const CUSTOMERS = gql`
  fragment CUSTOMERS on Customers {
    rows @type(name: "Customer") {
      ...CUSTOMER
    }
    totalCount
  }
  ${CUSTOMER}
`;
