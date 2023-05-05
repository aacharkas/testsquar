import { gql } from '@apollo/client';

import { IMPORT_DETAILS_API } from '../../ImportDetails.constants';

export const CREATE_CUSTOMER_DATA = gql`
  mutation CREATE_CUSTOMER_DATA {
    createCustomerData(id:$id, input:$input)
      @rest(method: "POST", type: "NoResponse", path: "${IMPORT_DETAILS_API}/{args.id}/save-customer") {
        NoResponse
    }
}`;
