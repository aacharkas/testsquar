import React from 'react';

import CustomerForm from '../../../../components/Customers/Customer/CustomerForm';
import Layout from '../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { useAbility } from '../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const Company = () => {
  const ability = useAbility();
  const access =
    ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.CUSTOMER) ||
    ability.can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.CUSTOMER);
  return <Layout>{access && <CustomerForm />}</Layout>;
};

export default Company;

const getStaticProps = makeStaticProps(['customers']);
export { getStaticPaths, getStaticProps };
