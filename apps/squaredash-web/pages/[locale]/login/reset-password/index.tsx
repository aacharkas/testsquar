import React from 'react';

import LoginWrapper from '../../../../components/Login/LoginWrapper';
import ResetPassword from '../../../../components/Login/ResetPassword/ResetPassword';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const SignInPage = () => {
  return (
    <LoginWrapper>
      <ResetPassword />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['login']);
export { getStaticPaths, getStaticProps };

export default SignInPage;
