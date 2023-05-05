import { gql } from '@apollo/client';

export const ADMINS = gql`
  fragment ADMINS on Admins {
    rows
    totalCount
  }
`;
