import { gql } from '@apollo/client';

export const UOM = gql`
  fragment UOM on UoM {
    id
    name
    abbreviation
  }
`;

export const UOM_MUTATION = gql`
  fragment UOM_MUTATION on UoM {
    id
    name
    abbreviation
  }
`;

export const UOMS = gql`
  fragment UOMS on UoMs {
    rows
    totalCount
  }
`;
