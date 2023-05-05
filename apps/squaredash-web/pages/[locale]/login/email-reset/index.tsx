import React from 'react';

import EmailReset from '../../../../components/Login/EmailReset/EmailReset';
import LoginWrapper from '../../../../components/Login/LoginWrapper';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const ResetEmailPage = () => {
  return (
    <LoginWrapper>
      <EmailReset />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['login']);
export { getStaticPaths, getStaticProps };

export default ResetEmailPage;
