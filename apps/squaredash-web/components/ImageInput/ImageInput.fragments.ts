import { gql } from '@apollo/client';

export const IMAGE_URL = gql`
  fragment IMAGE_URL on ImageUrl {
    id
    signedUrl
  }
`;
