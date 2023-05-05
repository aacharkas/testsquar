import React from 'react';

import Layout from '../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import {Can} from '../../../../lib/ability';
import {getStaticPaths, makeStaticProps} from '../../../../lib/getStatic';
import ImportDetails from '../../../../components/Imports/ImportDetails/ImportDetails';

const Imports = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.IMPORTS}>
        <ImportDetails/>
      </Can>
    </Layout>
  );
};

export default Imports;

const getStaticProps = makeStaticProps(['imports']);
export {getStaticPaths, getStaticProps};
