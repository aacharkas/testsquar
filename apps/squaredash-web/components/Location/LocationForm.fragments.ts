import { gql } from '@apollo/client';

export const LOCATION = gql`
  fragment LOCATION on Location {
    addressId
    companyId
    id
    isMain
    name
    email
    phone
    address
  }
`;
