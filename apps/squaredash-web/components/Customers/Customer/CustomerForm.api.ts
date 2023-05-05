import { gql } from '@apollo/client';

import { CUSTOMER_API } from './CustomerForm.constants';
import { CUSTOMER_FULL } from './CustomerForm.fragments';

export const CUSTOMER_CREATE = gql`
  mutation CUSTOMER_CREATE {
    customerCreate(input: $input)
      @rest(method: "POST", type: "Customer", path: "${CUSTOMER_API}") {
        ...CUSTOMER_FULL
    }
  }
  ${CUSTOMER_FULL}
`;

export const CUSTOMER_UPDATE = gql`
  mutation CUSTOMER_UPDATE {
    customerUpdate(input:$input, uuid:$uuid)
      @rest(method: "PUT", type: "Customer", path: "${CUSTOMER_API}/{args.uuid}") {
        ...CUSTOMER_FULL
    }
  }
  ${CUSTOMER_FULL}
`;

export const CUSTOMER_DELETE = gql`
  mutation CUSTOMER_DELETE($uuid:String!) {
    customerDelete(uuid:$uuid)
      @rest(method: "DELETE", type: "Customer", path: "${CUSTOMER_API}/{args.uuid}") {
        NoResponse
    }
  }
`;

export const CUSTOMER_GET = gql`
  query CUSTOMER_GET($uuid:String!) {
    customerGet(uuid:$uuid)
      @rest(method: "GET", type: "Customer", path: "${CUSTOMER_API}/{args.uuid}") {
        ...CUSTOMER_FULL
    }
  }
  ${CUSTOMER_FULL}
`;
