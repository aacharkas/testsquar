import React from 'react';

import ChangePasswordScreen from '../../../components/ChangePassword/ChangePasswordScreen';
import Layout from '../../../components/Layout/Layout';
import { getStaticPaths, makeStaticProps } from '../../../lib/getStatic';

const Companies = () => {
  return (
    <Layout>
      <ChangePasswordScreen />
    </Layout>
  );
};

const getStaticProps = makeStaticProps(['companies']);
export { getStaticPaths, getStaticProps };

export default Companies;
