import { gql } from '@apollo/client';

export const EMAIL = gql`
  fragment EMAIL on Email {
    email
  }
`;
