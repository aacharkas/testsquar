import { gql } from '@apollo/client';

export const ALGORITHM_DOCUMENT = gql`
  fragment ALGORITHM_DOCUMENT on AlgorithmDocuments {
    key
  }
`;

export const ALGORITHM_DOCUMENT_VERIFIED = gql`
  fragment ALGORITHM_DOCUMENT_VERIFIED on AlgorithmDocumentsVerified {
    documents
    finishedAt
    id
    startedAt
  }
`;
