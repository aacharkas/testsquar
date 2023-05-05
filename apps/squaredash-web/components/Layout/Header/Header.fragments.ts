import { gql } from '@apollo/client';

export const USER = gql`
  fragment USER on User {
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
    finishedOnboarding
  }
`;
