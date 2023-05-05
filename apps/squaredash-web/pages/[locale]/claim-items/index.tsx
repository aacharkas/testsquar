import React from 'react';

import ClaimItemsTable from '../../../components/ClaimItems/ClaimItemsTable';
import Layout from '../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { Can } from '../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

const ClaimItems = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.CLAIM_ITEMS}>
        <ClaimItemsTable />
      </Can>
    </Layout>
  );
};

const getStaticProps = makeStaticProps(['claim_items']);
export { getStaticPaths, getStaticProps };

export default ClaimItems;
