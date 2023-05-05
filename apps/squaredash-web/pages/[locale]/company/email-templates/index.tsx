import EmailTemplatesTable from '../../../../../../apps/squaredash-web/components/EmailTemplates/EmailTemplatesTable';
import React from 'react';

import Layout from '../../../../components/Layout/Layout';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import {Can} from '../../../../lib/ability';
import {getStaticPaths, makeStaticProps} from '../../../../lib/getStatic';

const Imports = () => {
  return (
    <Layout>
      <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.EMAIL_TEMPLATES}>
        <EmailTemplatesTable/>
      </Can>
    </Layout>
  );
};

export default Imports;

const getStaticProps = makeStaticProps(['email_templates']);
export {getStaticPaths, getStaticProps};
