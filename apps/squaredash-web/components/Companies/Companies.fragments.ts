import { gql } from '@apollo/client';

export const COMPANY = gql`
  fragment COMPANY on Company {
    id
    name
    status
    owners
    avatar
  }
`;

export const COMPANY_MUTATION = gql`
  fragment COMPANY_MUTATION on Company {
    id
    name
    legalName
    avatar
  }
`;

export const COMPANIES = gql`
  fragment COMPANIES on Companies {
    rows
    totalCount
  }
`;
