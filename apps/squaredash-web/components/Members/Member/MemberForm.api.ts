import { gql } from '@apollo/client';

import { MEMBER_API, UPDATE_EMAIL_API } from '../Members.constants';
import { INVITE_MEMBER_API } from './MemberForm.constants';
import { MEMBER } from './MemberForm.fragments';

export const GET_MEMBER = gql`
  query GET_MEMBER($uuid:String!) {
    get_member(uuid:$uuid) @rest(method: "GET" type: "Member" path: "${MEMBER_API}/{args.uuid}") {
      ...MEMBER
    }
  }
  ${MEMBER}
`;

export const INVITE_MEMBER = gql`
  mutation INVITE_MEMBER {
    invite_member(input: $input)
      @rest(method: "POST", type: "Member", path: "${INVITE_MEMBER_API}") {
        ...MEMBER
    }
  }
  ${MEMBER}
`;

export const UPDATE_MEMBER = gql`
  mutation UPDATE_MEMBER {
    update_member(uuid:$uuid, input: $input)
      @rest(method: "PUT", type: "Member", path: "${MEMBER_API}/{args.uuid}") {
        ...MEMBER
    }
  }
  ${MEMBER}
`;

export const UPDATE_EMAIL = gql`
  mutation UPDATE_EMAIL {
    update_email(input: $input)
      @rest(method: "POST", type: "NoResponse", path: "${UPDATE_EMAIL_API}") {
        NoResponse
    }
  }
`;
