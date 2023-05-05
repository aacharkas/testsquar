import React from 'react';

import LoginWrapper from '../../../../components/Login/LoginWrapper';
import MemberSignUp from '../../../../components/Login/MemberSignup/MemberSignUp';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const MemberSignUpPage = () => {
  return (
    <LoginWrapper>
      <MemberSignUp />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['login']);
export { getStaticPaths, getStaticProps };

export default MemberSignUpPage;
