import React from 'react';

import Layout from '../../../../../components/Layout/Layout';
import LocationForm from '../../../../../components/Location/LocationForm';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../../constants/permissions';
import { useAbility } from '../../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../../lib/getStatic';

const Location = () => {
  const ability = useAbility();
  const access =
    ability.can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.COMPANY_LOCATION) ||
    ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.COMPANY_LOCATION);
  return <Layout>{access && <LocationForm />}</Layout>;
};

export default Location;

const getStaticProps = makeStaticProps(['location']);
export { getStaticPaths, getStaticProps };
