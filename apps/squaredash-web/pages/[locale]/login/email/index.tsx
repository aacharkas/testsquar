import React from 'react';

import ResendEmail from '../../../../components/Login/Email/ResendEmail';
import LoginWrapper from '../../../../components/Login/LoginWrapper';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const EmailPage = () => {
  return (
    <LoginWrapper>
      <ResendEmail />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['login']);
export { getStaticPaths, getStaticProps };

export default EmailPage;
