import React from 'react';

import CompaniesTable from '../../../components/Companies/CompaniesTable';
import Layout from '../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { Can } from '../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

const Companies = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.COMPANY_LIST}>
        <CompaniesTable />
      </Can>
    </Layout>
  );
};

const getStaticProps = makeStaticProps(['companies']);
export { getStaticPaths, getStaticProps };

export default Companies;
