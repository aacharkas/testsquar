import { gql } from '@apollo/client';

export const CUSTOMER = gql`
  fragment CUSTOMER on Customer {
    id
    displayName
    type
    firstName
    lastName
    phone
    email
    propertyAddress
    shippingAddress
    createdAt
    updatedAt
    savedCustomer @type(name: "Customer") {
      billingAddress
      ...CUSTOMER
    }
  }
`;

export const ADJUSTER = gql`
  fragment ADJUSTER on Adjuster {
    id
    name
    type
    phone
    email
    address
  }
`;

export const INSURANCE_CARRIER = gql`
  fragment INSURANCE_CARRIER on InsuranceCarrier {
    id
    name
    email
    phone
    fax
    address
    insuranceCarrierId
    createdAt
    updatedAt
    adjusters @type(name: "Adjuster") {
      ...ADJUSTER
    }
  }
  ${ADJUSTER}
`;

export const GROUP_ITEM = gql`
  fragment GROUP_ITEM on GroupItem {
    id
    description
    depreciationPercentage
    sequence
    notes
    quantity
    unitOfMeasurement
    unitPrice
    tax
    overhead
    rcv
    acv
    ageLife
    condition
    depreciationSum
    isDepreciationRefundable
    createdAt
    updatedAt
  }
`;

export const GROUP = gql`
  fragment GROUP on Group {
    id
    name
    notes
    items @type(name: "GroupItem") {
      ...GROUP_ITEM
    }
    groups @type(name: "Group") {
      ...GROUP
    }
    totalTax
    overhead
    totalRCV
    totalACV
    totalOverhead
    totalLineItems
    depreciation
    parentId
    insuranceScopeDraftId
    createdAt
    updatedAt
  }
  ${GROUP_ITEM}
`;

export const IMPORT = gql`
  fragment IMPORT on Import {
    id
    companyId
    claimNumber
    status
    typeOfLoss
    dateOfLoss
    dateInspected
    dateContacted
    dateReceived
    dateEntered
    policyNumber
    priceList
    initialDocumentId
    initialDocumentLink
    initialDocumentName
    total
    totalRcv
    totalOverhead
    totalTax
    totalDepreciation
    deductible
    totalAcv
    totalLineItems
    netClaimSum
    netClaimIfDepreciationIsRecovered
    totalRecoverableDepreciationSum
    totalNonRecoverableDepreciationSum
    createdAt
    updatedAt
    customer @type(name: "Customer") {
      ...CUSTOMER
    }
    insuranceCarrier @type(name: "InsuranceCarrier") {
      ...INSURANCE_CARRIER
    }
    groups @type(name: "Group") {
      ...GROUP
    }
  }
  ${CUSTOMER}
  ${INSURANCE_CARRIER}
  ${GROUP}
`;
