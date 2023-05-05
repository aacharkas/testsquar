import React from 'react';

import AdminForm from '../../../../components/Admins/Admin/AdminForm';
import Layout from '../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { Can } from '../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const Admin = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.INVITE} a={PERMISSIONS.SUPER_ADMIN}>
        <AdminForm />
      </Can>
    </Layout>
  );
};

export default Admin;

const getStaticProps = makeStaticProps(['admins']);
export { getStaticPaths, getStaticProps };
