import ImportsTable from '../../../../../apps/squaredash-web/components/Imports/ImportsTable';
import React from 'react';

import Layout from '../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import {Can} from '../../../lib/ability';
import {getStaticPaths, makeStaticProps} from '../../../lib/getStatic';

const Imports = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.IMPORTS}>
        <ImportsTable/>
      </Can>
    </Layout>
  );
};

export default Imports;

const getStaticProps = makeStaticProps(['imports']);
export {getStaticPaths, getStaticProps};
