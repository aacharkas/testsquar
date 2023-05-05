import React from 'react';

import ForgotPassword from '../../../../components/Login/ForgotPassword/ForgotPassword';
import LoginWrapper from '../../../../components/Login/LoginWrapper';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const SignInPage = () => {
  return (
    <LoginWrapper>
      <ForgotPassword />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['login']);
export { getStaticPaths, getStaticProps };

export default SignInPage;
