import React from 'react';

import CompanySignUp from '../../../../components/Login/CompanySignup/CompanySignUp';
import LoginWrapper from '../../../../components/Login/LoginWrapper';
import { getStaticPaths, makeStaticProps } from '../../../../lib/getStatic';

const CompanySignUpPage = () => {
  return (
    <LoginWrapper>
      <CompanySignUp />
    </LoginWrapper>
  );
};

const getStaticProps = makeStaticProps(['companies']);
export { getStaticPaths, getStaticProps };

export default CompanySignUpPage;
