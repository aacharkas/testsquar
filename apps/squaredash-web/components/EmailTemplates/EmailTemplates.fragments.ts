import { gql } from '@apollo/client';

export const TEMPLATES = gql`
  fragment TEMPLATES on Templates {
    rows
    totalCount
  }
`;
