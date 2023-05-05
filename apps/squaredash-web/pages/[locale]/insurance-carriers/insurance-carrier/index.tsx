import React from 'react';

import InsuranceCarrierForm from '../../../../components/InsuranceCarriers/InsuranceCarrier/InsuranceCarrierForm';
import Layout from '../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { useAbility } from '../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const InsuranceCarrier = () => {
  const ability = useAbility();
  const access =
    ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.INSURANCE_CARRIERS) ||
    ability.can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.INSURANCE_CARRIERS);
  return <Layout>{access && <InsuranceCarrierForm />}</Layout>;
};

export default InsuranceCarrier;

const getStaticProps = makeStaticProps(['insurance_carriers']);
export { getStaticPaths, getStaticProps };
