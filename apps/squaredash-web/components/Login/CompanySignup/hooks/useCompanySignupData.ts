import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useToken } from '../../../../../../libs/web/hooks/useToken';
import { ROUTES } from '../../../../constants/routes';
import { varToken } from '../../../../lib/variables';
import { GET_USER } from '../../../Companies/CompanyProfile/CompanyProfile.api';
import { localIssueText } from '../../../Components/ErrorMessage';
import {
  COMPANY_SIGN_UP,
  UPDATE_COMPANY_ON_SIGN_UP,
  VERIFY_EMAIL,
} from '../CompanySignUp.api';
import {
  COMPANY_SIGNUP_FIELDS,
  DEFAULT_COMPANY_SIGNUP,
} from '../CompanySignUp.constants';
import type { TCompanySignup } from '../CompanySignUp.types';

const useCompanySignupData = () => {
  const { t } = useTranslation(['system_errors']);
  const router = useRouter();
  const { token } = router.query;
  const isAuthorized = useToken();

  const [companySignUp, { loading }] = useMutation(COMPANY_SIGN_UP);
  const [companyUpdateOnSignUp, { loading: companyUpdateOnSignUpLoading }] =
    useMutation(UPDATE_COMPANY_ON_SIGN_UP);
  const [verifyEmail, { error: errorVerify }] = useMutation(VERIFY_EMAIL, {
    variables: { token, skip: isAuthorized },
  });

  const [companySignUpForm, setCompanySignUpForm] = useState<TCompanySignup>(
    DEFAULT_COMPANY_SIGNUP
  );

  useEffect(() => {
    if (errorVerify) router.push(`/${ROUTES.INVALID_LINK}`);
  }, [errorVerify]);

  const [companySignUpFormErrors, setCompanySignUpFormErrors] =
    useState<TCompanySignup>({});

  const { loading: loadingUser, data: dataUser } = useQuery(GET_USER, {
    skip: !useToken(),
  });
  const companyId = useMemo(
    () => dataUser && dataUser?.get_user?.companyId,
    [dataUser]
  );

  const verifyCompanyEmail = useCallback(async () => {
    try {
      const { data } = await verifyEmail();
      varToken({
        ...data?.verify_email,
      });
    } catch (error) {
      captureSentryError(error);
      console.log('error', error);
    }
  }, [verifyEmail]);

  useEffect(() => {
    if (router.isReady) {
      if (isAuthorized) {
        router.push(`/${ROUTES.DASHBOARD}`);
      } else if (token !== 'redirect') {
        verifyCompanyEmail();
      }
    }
  }, [verifyCompanyEmail]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...companySignUpForm,
      [name]: value,
    };
    setCompanySignUpForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (companySignUpFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = companySignUpFormErrors;
      setCompanySignUpFormErrors(errors);
    }
  };

  const onFinishCompanySignUp = async () => {
    try {
      if (companyId) {
        await companyUpdateOnSignUp({
          variables: { companyId: companyId, input: companySignUpForm },
        });
      } else {
        await companySignUp({
          variables: { input: companySignUpForm },
        });
      }
      router.push(`/${ROUTES.DASHBOARD}`);
    } catch (error) {
      captureSentryError(error, {
        entityId: companyId,
        payload: companySignUpForm,
      });
      setCompanySignUpFormErrors(error?.networkError?.message);
    }
  };

  const isValid = (): boolean => {
    const errors = {};
    if (
      !companySignUpForm[COMPANY_SIGNUP_FIELDS.COMPANY_NAME].trim() ||
      !companySignUpForm[COMPANY_SIGNUP_FIELDS.PEOPLE_AMOUNT] ||
      !companySignUpForm[COMPANY_SIGNUP_FIELDS.JOBS_AMOUNT] ||
      !companySignUpForm[COMPANY_SIGNUP_FIELDS.AWARENESS]
    ) {
      errors['common_issue'] = true;
      errors['common_text'] = t('fill_form');
    }

    setCompanySignUpFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    handleChange,
    onFinishCompanySignUp,
    isValid,
    loading: loading || loadingUser || companyUpdateOnSignUpLoading,
    companySignUpForm,
    companySignUpFormErrors,
    localErrorText,
  };
};

export { useCompanySignupData };
