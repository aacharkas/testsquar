import { gql } from '@apollo/client';

import { CUSTOMER_FULL } from '../../Customers/Customer/CustomerForm.fragments';
import { INSURANCE_CARRIER_FULL } from '../../InsuranceCarriers/InsuranceCarrier/InsuranceCarrierForm.fragments';
import {
  CUSTOMER_API,
  IMPORT_DETAILS_API,
  INSURANCE_CARRIER_API,
} from './ImportDetails.constants';
import {
  ADJUSTER,
  CUSTOMER,
  IMPORT,
  INSURANCE_CARRIER,
} from './ImportDetails.fragments';

export const GET_IMPORT_DETAILS = gql`
  query GET_IMPORT_DETAILS($uuid:String!) {
    getImportDetails(uuid:$uuid)
      @rest(method: "GET", type: "Import", path: "${IMPORT_DETAILS_API}/{args.uuid}") {
        ...IMPORT
    }
  }
  ${IMPORT}
`;

export const UPDATE_IMPORT_GENERAL_DATA = gql`
  mutation UPDATE_IMPORT_GENERAL_DATA {
    updateImportGeneralData(uuid:$uuid, input:$input)
      @rest(method: "PUT", type: "Import", path: "${IMPORT_DETAILS_API}/{args.uuid}") {
        ...IMPORT
    }
  }
  ${IMPORT}
`;

export const UPDATE_IMPORT_CUSTOMER_DATA = gql`
  mutation UPDATE_IMPORT_CUSTOMER_DATA {
    updateImportCustomerData(scopeId:$scopeId, uuid:$uuid, input:$input)
      @rest(method: "PUT", type: "Customer", path: "${IMPORT_DETAILS_API}/{args.scopeId}/customer/{args.uuid}") {
        ...CUSTOMER
    }
  }
  ${CUSTOMER}
`;

export const UPDATE_IMPORT_INSURANCE_CARRIER_DATA = gql`
  mutation UPDATE_IMPORT_INSURANCE_CARRIER_DATA {
    updateImportInsuranceCarrierData(scopeId:$scopeId, uuid:$uuid, input:$input)
      @rest(method: "PUT", type: "InsuranceCarrier", path: "${IMPORT_DETAILS_API}/{args.scopeId}/insurance-carrier/{args.uuid}") {
        ...INSURANCE_CARRIER
    }
  }
  ${INSURANCE_CARRIER}
`;

export const UPDATE_IMPORT_ADJUSTERS_DATA = gql`
  mutation UPDATE_IMPORT_ADJUSTERS_DATA {
    updateImportAdjustersData(scopeId:$scopeId, carrierId:$carrierId, uuid:$uuid, input:$input)
      @rest(method: "PUT", type: "Adjuster", path: "${IMPORT_DETAILS_API}/{args.scopeId}/insurance-carrier/{args.carrierId}/adjuster/{args.uuid}") {
        ...ADJUSTER
    }
  }
  ${ADJUSTER}
`;

export const DELETE_IMPORT_ADJUSTERS_DATA = gql`
  mutation DELETE_IMPORT_ADJUSTERS_DATA {
    deleteAdjusters(scopeId:$scopeId, carrierId:$carrierId, uuid:$uuid, input:$input)
      @rest(method: "DELETE", type: "NoResponse", path: "${IMPORT_DETAILS_API}/{args.scopeId}/insurance-carrier/{args.carrierId}/adjuster/{args.uuid}") {
        NoResponse
    }
  }
`;

export const CUSTOMER_GET_BY_DISPLAY_NAME = gql`
  query CUSTOMER_GET_BY_DISPLAY_NAME($name:String!) {
    customerGet(name:$name)
      @rest(method: "GET", type: "Customer", path: "${CUSTOMER_API}/{args.name}") {
        ...CUSTOMER_FULL
    }
  }
  ${CUSTOMER_FULL}
`;

export const INSURANCE_CARRIER_GET_BY_NAME = gql`
  query INSURANCE_CARRIER_GET_BY_NAME($name:String!) {
    insuranceCarrierGet(name:$name)
      @rest(method: "GET", type: "InsuranceCarrier", path: "${INSURANCE_CARRIER_API}/{args.name}") {
        ...INSURANCE_CARRIER_FULL
    }
  }
  ${INSURANCE_CARRIER_FULL}
`;

export const VERIFY_IMPORT = gql`
  mutation VERIFY_IMPORT {
    verifyImportData(scopeId:$scopeId, input:$input)
      @rest(method: "PATCH", type: "Import", path: "${IMPORT_DETAILS_API}/{args.scopeId}/status") {
        NoResponse
    }
  }
`;

export const TRIGGER_IMPORT_VALIDATION = gql`
  mutation TRIGGER_IMPORT_VALIDATION {
    validation(scopeId:$scopeId, input:$input)
      @rest(method: "POST", type: "Import", path: "${IMPORT_DETAILS_API}/{args.scopeId}/validate") {
        NoResponse
    }
  }
`;
