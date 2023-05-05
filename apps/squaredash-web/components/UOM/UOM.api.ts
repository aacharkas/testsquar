import { gql } from '@apollo/client';

import { UOM_API } from './UOM.constants';
import { UOMS, UOM_MUTATION } from './UOM.fragments';

export const GET_UOMS = gql`
  query GET_UOMS {
    uoms(search: $search, take: $take, skip: $skip)
    @rest(method: "GET" type: "UoMs" path: "${UOM_API}?{args}") {
      ...UOMS
    }
  }
  ${UOMS}
`;

export const CREATE_UOM = gql`
  mutation CREATE_UOM {
    createUOM(input: $input)
      @rest(method: "POST", type: "UoM", path: "${UOM_API}") {
        ...UOM_MUTATION
    }
  }
  ${UOM_MUTATION}
`;

export const UPDATE_UOM = gql`
  mutation UPDATE_UOM {
    createUOM(input:$input, uuid:$uuid)
      @rest(method: "PUT", type: "UoM", path: "${UOM_API}/{args.uuid}") {
        ...UOM_MUTATION
    }
  }
  ${UOM_MUTATION}
`;

export const DELETE_UOM = gql`
  mutation DELETE_UOM($uuid:String!) {
    deleteUOM(uuid:$uuid)
      @rest(method: "DELETE", type: "UoM", path: "${UOM_API}/{args.uuid}") {
        NoResponse
    }
  }
`;
