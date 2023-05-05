import { gql } from '@apollo/client';

export const INSURANCE_CARRIER = gql`
  fragment INSURANCE_CARRIER on InsuranceCarrier {
    id
    name
    email
    phone
    createdAt
    updatedAt
  }
`;

export const INSURANCE_CARRIER_FULL = gql`
  fragment INSURANCE_CARRIER_FULL on InsuranceCarrier {
    id
    name
    email
    phone
    createdAt
    updatedAt
    fax
    address
  }
`;
