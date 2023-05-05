import React from 'react';

import AdminsTable from '../../../components/Admins/AdminsTable';
import Layout from '../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { Can } from '../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

const Admins = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.SUPER_ADMIN_LIST}>
        <AdminsTable />
      </Can>
    </Layout>
  );
};

const getStaticProps = makeStaticProps(['admins']);
export { getStaticPaths, getStaticProps };

export default Admins;
