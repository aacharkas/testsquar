import React from 'react';

import CompanyProfile from '../../../components/Companies/CompanyProfile/CompanyProfile';
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
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.COMPANY}>
        <CompanyProfile />
      </Can>
    </Layout>
  );
};

export default Company;

const getStaticProps = makeStaticProps(['companies', 'location']);
export { getStaticPaths, getStaticProps };
