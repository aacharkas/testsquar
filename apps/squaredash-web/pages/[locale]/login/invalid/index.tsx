import React from 'react';

import InvalidLink from '../../../../components/Login/InvalidLink/InvalidLink';
import LoginWrapper from '../../../../components/Login/LoginWrapper';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const SignUpPage = () => {
  return (
    <LoginWrapper>
      <InvalidLink resendLink />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['login']);
export { getStaticPaths, getStaticProps };

export default SignUpPage;
