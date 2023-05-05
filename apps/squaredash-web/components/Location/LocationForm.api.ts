import { gql } from '@apollo/client';

import {
  LOCATION_CREATE_API,
  LOCATION_DELETE_API,
  LOCATION_GET_API,
  LOCATION_UPDATE_API,
} from './LocationForm.constants';
import { LOCATION } from './LocationForm.fragments';

export const LOCATION_CREATE = gql`
  mutation LOCATION_CREATE {
    location_create(input: $input)
      @rest(method: "POST", type: "Location", path: "${LOCATION_CREATE_API}") {
        ...LOCATION
    }
  }
  ${LOCATION}
`;

export const LOCATION_UPDATE = gql`
  mutation LOCATION_UPDATE {
    location_update(input:$input, uuid:$uuid)
      @rest(method: "PUT", type: "Location", path: "${LOCATION_UPDATE_API}/{args.uuid}") {
        ...LOCATION
    }
  }
  ${LOCATION}
`;

export const LOCATION_DELETE = gql`
  mutation LOCATION_DELETE($uuid:String!) {
    location_delete(uuid:$uuid)
      @rest(method: "DELETE", type: "Location", path: "${LOCATION_DELETE_API}/{args.uuid}") {
        NoResponse
    }
  }
`;

export const LOCATION_GET = gql`
  query LOCATION_GET($uuid:String!) {
    location_get(uuid:$uuid)
      @rest(method: "GET", type: "Location", path: "${LOCATION_GET_API}/{args.uuid}") {
        ...LOCATION
    }
  }
  ${LOCATION}
`;
