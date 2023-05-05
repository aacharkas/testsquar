import { gql } from '@apollo/client';

export const ADMIN = gql`
  fragment ADMIN on Admin {
    id
    name
    email
    role
    status
    timezone
    avatarId
    avatar
  }
`;
