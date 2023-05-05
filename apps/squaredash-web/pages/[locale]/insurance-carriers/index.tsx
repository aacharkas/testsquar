import React from 'react';

import InsuranceCarriersTable from '../../../components/InsuranceCarriers/InsuranceCarriersTable';
import Layout from '../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { Can } from '../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

const InsuranceCarriers = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.INSURANCE_CARRIERS}>
        <InsuranceCarriersTable />
      </Can>
    </Layout>
  );
};

export default InsuranceCarriers;

const getStaticProps = makeStaticProps(['insurance_carriers']);
export { getStaticPaths, getStaticProps };
