import { gql } from '@apollo/client';

import { GET_UPLOAD_LINK_API } from '../ImageInput/ImageInput.constants';
import { IMPORTS_API } from './Imports.constants';
import { FILE_URL, IMPORTS, IMPORT_SCOPE_MUTATION } from './Imports.fragments';

export const GET_UPLOAD_LINK = gql`
  query GET_LINK {
    get_link(extension: $extension, instance: $instance)
      @rest(method: "GET", type: "InsuranceScope", path: "${GET_UPLOAD_LINK_API}{args.instance}?extension={args.extension}") {
        ...FILE_URL
    }
  }
  ${FILE_URL}
`;

export const UPLOAD_NEW_SCOPE = gql`
  mutation UPLOAD_NEW_SCOPE{
    uploadNewScope(input:$input,payload:$payload)
      @rest(method: "POST", type: "InsuranceScope", path: "${IMPORTS_API}/import") {
        ...IMPORT_SCOPE_MUTATION
    }
  }
  ${IMPORT_SCOPE_MUTATION}
`;

export const GET_IMPORTS = gql`
  query GET_IMPORTS {
    imports(search: $search, take: $take, skip: $skip, customerIds: $customerIds, insuranceCarrierIds: $insuranceCarrierIds, dateOfLossFrom: $dateOfLossFrom, dateOfLossTo: $dateOfLossTo, rcvFrom: $rcvFrom, rcvTo: $rcvTo)
      @rest(method: "GET" type: "Imports" path: "${IMPORTS_API}?{args}") {
      ...IMPORTS
    }
  }
  ${IMPORTS}
`;
