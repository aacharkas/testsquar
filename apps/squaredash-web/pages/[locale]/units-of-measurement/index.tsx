import React from 'react';

import Layout from '../../../components/Layout/Layout';
import UOMTable from '../../../components/UOM/UOMTable';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { Can } from '../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

const UnitOfMeasurement = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.MEASUREMENT_UNITS}>
        <UOMTable />
      </Can>
    </Layout>
  );
};

export default UnitOfMeasurement;

const getStaticProps = makeStaticProps(['uom']);
export { getStaticPaths, getStaticProps };
