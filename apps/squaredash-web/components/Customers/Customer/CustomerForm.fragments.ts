import { gql } from '@apollo/client';

export const ADDRESS = gql`
  fragment ADDRESS on Address {
    country
    state
    city
    zipCode
    streetAddress1
    streetAddress2
    apartment
    latitude
    longitude
    placeId
    formattedAddress
  }
`;

export const CUSTOMER_FULL = gql`
  fragment CUSTOMER_FULL on Customer {
    id
    displayName
    firstName
    lastName
    email
    phone
    type
    shippingName
    shippingAddressId
    shippingAddress @type(name: "Address") {
      ...ADDRESS
    }
    responsibleMembers
    createdAt
    updatedAt
    companyId
    billingName
    billingAddressId
    billingAddress @type(name: "Address") {
      ...ADDRESS
    }
    notes
    parentId
    parent
    subCustomers
  }
  ${ADDRESS}
`;

export const CUSTOMER = gql`
  fragment CUSTOMER on Customer {
    id
    displayName
    email
    phone
    billingName
    billingAddressId
    billingAddress @type(name: "Address") {
      ...ADDRESS
    }
    parentId
    responsibleMembers
    createdAt
    updatedAt
  }
  ${ADDRESS}
`;
