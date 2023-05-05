import React from 'react';

import Layout from '../../../../components/Layout/Layout';
import MembersTable from '../../../../components/Members/MembersTable';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { Can } from '../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const Members = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.USER_LIST}>
        <MembersTable />
      </Can>
    </Layout>
  );
};

const getStaticProps = makeStaticProps(['members']);
export { getStaticPaths, getStaticProps };

export default Members;
