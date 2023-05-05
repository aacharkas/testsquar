import { gql } from '@apollo/client';

import { INSURANCE_CARRIER } from './InsuranceCarrier/InsuranceCarrierForm.fragments';

export const INSURANCE_CARRIES = gql`
  fragment INSURANCE_CARRIES on InsuranceCarries {
    rows @type(name: "InsuranceCarrier") {
      ...INSURANCE_CARRIER
    }
    totalCount
  }
  ${INSURANCE_CARRIER}
`;
