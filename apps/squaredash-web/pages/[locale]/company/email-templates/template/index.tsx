import EmailTemplate from '../../../../../../../apps/squaredash-web/components/EmailTemplates/EmailTemplate/EmailTemplateForm';
import React from 'react';

import Layout from '../../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../../constants/permissions';
import {useAbility} from '../../../../../lib/ability';
import {getStaticPaths, makeStaticProps} from '../../../../../lib/getStatic';

const EmailTemplateEdit = () => {
  const ability = useAbility();
  const access = ability.can(PERMISSION_ACTIONS.UPDATE, PERMISSIONS.EMAIL_TEMPLATES);
  return <Layout>{access && <EmailTemplate />}</Layout>;
};

export default EmailTemplateEdit;

const getStaticProps = makeStaticProps(['email_templates']);
export { getStaticPaths, getStaticProps };
