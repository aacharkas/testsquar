import React from 'react';

import LoginWrapper from '../../../../components/Login/LoginWrapper';
import SignUp from '../../../../components/Login/Signup/SignUp';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const SignUpPage = () => {
  return (
    <LoginWrapper>
      <SignUp />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['errors', 'login']);
export { getStaticPaths, getStaticProps };

export default SignUpPage;
