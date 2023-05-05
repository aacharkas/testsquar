import { gql } from '@apollo/client';

export const MEMBER = gql`
  fragment MEMBER on Member {
    id
    name
    email
    role
    status
    phone
    avatar
    companyId
    addressId
    birthDate
    tShirtSize
    techStatus
    timezone
    createdAt
    updatedAt
    lockedAt
    permissions
  }
`;

export const MEMBERS = gql`
  fragment MEMBERS on Members {
    rows
    totalCount
  }
`;
