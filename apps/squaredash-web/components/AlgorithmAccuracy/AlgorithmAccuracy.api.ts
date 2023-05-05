import { gql } from '@apollo/client';

import {
  ALGORITHM_DOCUMENTS_API,
  VALIDATE_ALGORITHM_DOCUMENTS_API,
  VALIDATE_GET_ALGORITHM_DOCUMENTS_API,
} from './AlgorithmAccuracy.constants';
import {
  ALGORITHM_DOCUMENT,
  ALGORITHM_DOCUMENT_VERIFIED,
} from './AlgorithmAccuracy.fragments';

export const GET_ALGORITHM_DOCUMENTS = gql`
  query GET_ALGORITHM_DOCUMENTS {
    templates @rest(method: "GET" type: "AlgorithmDocuments" path: "${ALGORITHM_DOCUMENTS_API}") {
      ...ALGORITHM_DOCUMENT
    }
  }
 ${ALGORITHM_DOCUMENT}
`;

export const VALIDATE_ALGORITHM_DOCUMENTS = gql`
  mutation VALIDATE_ALGORITHM_DOCUMENTS {
    validateAlgorithmDocuments(input: $input)
      @rest(method: "POST", type: "AlgorithmDocuments", path: "${VALIDATE_ALGORITHM_DOCUMENTS_API}") {
        ...ALGORITHM_DOCUMENT
    }
  }
  ${ALGORITHM_DOCUMENT}
`;

export const GET_VALIDATE_ALGORITHM_DOCUMENTS = gql`
  query GET_VALIDATE_ALGORITHM_DOCUMENTS {
    validateAlgorithmDocuments @rest(method: "GET" type: "AlgorithmDocumentsVerified" path: "${VALIDATE_GET_ALGORITHM_DOCUMENTS_API}") {
      ...ALGORITHM_DOCUMENT_VERIFIED
    }
  }
 ${ALGORITHM_DOCUMENT_VERIFIED}
`;
