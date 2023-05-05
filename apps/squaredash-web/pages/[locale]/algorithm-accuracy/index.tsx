import AlgorithmAccuracyTable from '../../../../../apps/squaredash-web/components/AlgorithmAccuracy/AlgorithmAccuracyTable';
import React from 'react';

import Layout from '../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import {Can} from '../../../lib/ability';
import {getStaticPaths, makeStaticProps} from '../../../lib/getStatic';

const AlgorithmAccuracy = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.ALGORITHM_ACCURACY}>
        <AlgorithmAccuracyTable/>
      </Can>
    </Layout>
  );
};

export default AlgorithmAccuracy;

const getStaticProps = makeStaticProps(['algorithm_accuracy']);
export {getStaticPaths, getStaticProps};
