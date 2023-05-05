import { gql } from '@apollo/client';

import { LOCATION } from '../../Location/LocationForm.fragments';

export const COMPANY = gql`
  fragment COMPANY on Company {
    id
    name
    legalName
    avatar
    status
    numberOfEmployees
    numberOfInsuranceJobsPerMonth
    comeFrom
    owners {
      rows
      totalCount
    }
    locations @type(name: "Location") {
      ...LOCATION
    }
  }
  ${LOCATION}
`;

export const USER = gql`
  fragment USER on User {
    companyId
    id
    status
    permissions
    addressId
    avatarId
    birthDate
    createdAt
    email
    lockedAt
    name
    phone
    role
    status
    tShirtSize
    techStatus
    updatedAt
  }
`;
