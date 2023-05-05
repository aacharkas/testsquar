import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useToken } from '../../../../../../libs/web/hooks/useToken';
import { ROUTES } from '../../../../constants/routes';
import { USER_STATUSES } from '../../../../constants/userStatuses';
import { useDefineUserStartPage } from '../../../../hooks/useDefineUserStartPage';
import { varToken } from '../../../../lib/variables';
import { GET_USER } from '../../../Companies/CompanyProfile/CompanyProfile.api';
import { localIssueText } from '../../../Components/ErrorMessage';
import { FORGOT_PASSWORD } from '../ForgotPassword.api';
import { DEFAULT_FORGOT, FORGOT_FIELDS } from '../ForgotPassword.constants';
import type { TForgot, TForgotErrors } from '../ForgotPassword.types';

const useForgotPasswordData = () => {
  const router = useRouter();
  const { t } = useTranslation(['login', 'system_errors']);
  const [forgotPassword, { loading }] = useMutation(FORGOT_PASSWORD);

  const [forgotForm, setForgotForm] = useState<TForgot>(DEFAULT_FORGOT);
  const [forgotFormErrors, setForgotFormErrors] = useState<TForgotErrors>({});

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...forgotForm,
      [name]: value,
    };
    setForgotForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (forgotFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = forgotFormErrors;
      setForgotFormErrors(errors);
    }
  };

  const onSendForgot = async () => {
    try {
      const { data } = await forgotPassword({
        variables: { input: forgotForm },
      });
      if (data) {
        router.push(`/${ROUTES.RESET_EMAIL}`);
      }
    } catch (error) {
      captureSentryError(error);
      setForgotFormErrors(error?.networkError?.message);
    }
  };

  const isValid = (): boolean => {
    const errors = {};

    if (!forgotForm[FORGOT_FIELDS.EMAIL].trim()) {
      errors[FORGOT_FIELDS.EMAIL] = t('IM0001', {
        ns: 'system_errors',
        component: 'email',
      });
    }
    setForgotFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    handleChange,
    onSendForgot,
    isValid,
    loading: loading,
    signInForm: forgotForm,
    signInFormErrors: forgotFormErrors,
    localErrorText,
  };
};

export { useForgotPasswordData };
