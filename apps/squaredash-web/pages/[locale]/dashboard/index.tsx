import React from 'react';

import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../../libs/web/constants/enums';
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
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.DASHBOARD}>
        <Typography variant={ETextVariant.xl}>Welcome to SquareDash</Typography>
      </Can>
    </Layout>
  );
};

const getStaticProps = makeStaticProps();
export { getStaticPaths, getStaticProps };

export default Companies;
