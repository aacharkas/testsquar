import { gql } from '@apollo/client';

export const IMPORTS = gql`
  fragment IMPORTS on Imports {
    rows
    totalCount
  }
`;

export const FILE_URL = gql`
  fragment FILE_URL on InsuranceScope {
    id
    signedUrl
  }
`;

export const IMPORT_SCOPE_MUTATION = gql`
  fragment IMPORT_SCOPE_MUTATION on InsuranceScope {
    id
    dateOfLoss
    claimNumber
    insuranceCarrierName
    rcv
    deductible
    status
  }
`;
