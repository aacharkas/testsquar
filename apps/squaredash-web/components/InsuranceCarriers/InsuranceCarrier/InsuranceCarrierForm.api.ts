import { gql } from '@apollo/client';

import {
  INSURANCE_CARRIER_CREATE_API,
  INSURANCE_CARRIER_DELETE_API,
  INSURANCE_CARRIER_GET_API,
  INSURANCE_CARRIER_UPDATE_API,
} from './InsuranceCarrierForm.constants';
import {
  INSURANCE_CARRIER,
  INSURANCE_CARRIER_FULL,
} from './InsuranceCarrierForm.fragments';

export const INSURANCE_CARRIER_CREATE = gql`
  mutation INSURANCE_CARRIER_CREATE {
    insuranceCarrierCreate(input: $input)
      @rest(method: "POST", type: "InsuranceCarrier", path: "${INSURANCE_CARRIER_CREATE_API}") {
        ...INSURANCE_CARRIER
    }
  }
  ${INSURANCE_CARRIER}
`;

export const INSURANCE_CARRIER_UPDATE = gql`
  mutation INSURANCE_CARRIER_UPDATE {
    insuranceCarrierUpdate(input:$input, uuid:$uuid)
      @rest(method: "PUT", type: "InsuranceCarrier", path: "${INSURANCE_CARRIER_UPDATE_API}/{args.uuid}") {
        ...INSURANCE_CARRIER
    }
  }
  ${INSURANCE_CARRIER}
`;

export const INSURANCE_CARRIER_DELETE = gql`
  mutation INSURANCE_CARRIER_DELETE($uuid:String!) {
    insuranceCarrierDelete(uuid:$uuid)
      @rest(method: "DELETE", type: "InsuranceCarrier", path: "${INSURANCE_CARRIER_DELETE_API}/{args.uuid}") {
        NoResponse
    }
  }
`;

export const INSURANCE_CARRIER_GET = gql`
  query INSURANCE_CARRIER_GET($uuid:String!) {
    insuranceCarrierGet(uuid:$uuid)
      @rest(method: "GET", type: "InsuranceCarrier", path: "${INSURANCE_CARRIER_GET_API}/{args.uuid}") {
        ...INSURANCE_CARRIER_FULL
    }
  }
  ${INSURANCE_CARRIER_FULL}
`;
