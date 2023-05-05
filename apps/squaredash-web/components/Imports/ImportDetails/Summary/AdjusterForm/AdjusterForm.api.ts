import { gql } from '@apollo/client';

import { IMPORT_DETAILS_API } from '../../ImportDetails.constants';
import { ADJUSTER } from '../../ImportDetails.fragments';

export const CREATE_IMPORT_ADJUSTERS_DATA = gql`
  mutation CREATE_IMPORT_ADJUSTERS_DATA {
    create_adjuster(scopeId:$scopeId, carrierId:$carrierId, input:$input)
      @rest(method: "POST", type: "Adjuster", path: "${IMPORT_DETAILS_API}/{args.scopeId}/insurance-carrier/{args.carrierId}/adjuster") {
        ...ADJUSTER
    }
  }
  ${ADJUSTER}
`;
