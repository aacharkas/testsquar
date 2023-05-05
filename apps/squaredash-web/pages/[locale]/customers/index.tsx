import React from 'react';

import CustomersTable from '../../../components/Customers/CustomersTable';
import Layout from '../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { Can } from '../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

const Company = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.CUSTOMER_LIST}>
        <CustomersTable />
      </Can>
    </Layout>
  );
};

export default Company;

const getStaticProps = makeStaticProps(['customers']);
export { getStaticPaths, getStaticProps };
