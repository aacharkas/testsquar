import React from 'react';

import Layout from '../../../../../components/Layout/Layout';
import MemberForm from '../../../../../components/Members/Member/MemberForm';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../../constants/permissions';
import { useAbility } from '../../../../../lib/ability';
import { getStaticPaths, makeStaticProps } from '../../../../../lib/getStatic';

const Member = () => {
  const ability = useAbility();
  const access =
    ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.USER) ||
    ability.can(PERMISSION_ACTIONS.CREATE, PERMISSIONS.USER);
  return <Layout>{access && <MemberForm />}</Layout>;
};

export default Member;

const getStaticProps = makeStaticProps(['members']);
export { getStaticPaths, getStaticProps };
