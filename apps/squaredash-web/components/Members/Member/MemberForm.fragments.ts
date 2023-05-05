import { gql } from '@apollo/client';

export const MEMBER = gql`
  fragment MEMBER on Member {
    id
    name
    email
    phone
    role
    address
    addressId
    birthDate
    companyId
    createdAt
    status
    tShirtSize
    status
    timezone
    updatedAt
    avatar
    avatarId
    changeEmailRequest
  }
`;
