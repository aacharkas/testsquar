import React from 'react';

import LoginWrapper from '../../../../components/Login/LoginWrapper';
import SignIn from '../../../../components/Login/Signin/SignIn';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const SignInPage = () => {
  return (
    <LoginWrapper>
      <SignIn />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['login']);
export { getStaticPaths, getStaticProps };

export default SignInPage;
