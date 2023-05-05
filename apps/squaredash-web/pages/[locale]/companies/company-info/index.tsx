import React from 'react';

import CompanyProfile from '../../../../components/Companies/CompanyProfile/CompanyProfile';
import Layout from '../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { useAbility } from '../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const CompanyCreate = () => {
  const ability = useAbility();
  const access =
    ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.COMPANY) ||
    ability.can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.COMPANY);
  return <Layout>{access && <CompanyProfile />}</Layout>;
};

export default CompanyCreate;

const getStaticProps = makeStaticProps(['companies']);
export { getStaticPaths, getStaticProps };
