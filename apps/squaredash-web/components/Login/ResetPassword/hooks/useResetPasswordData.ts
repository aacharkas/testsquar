import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { ROUTES } from '../../../../constants/routes';
import { localIssueText } from '../../../Components/ErrorMessage';
import { RESET_PASSWORD } from '../ResetPassword.api';
import { DEFAULT_RESET, RESET_FIELDS } from '../ResetPassword.constants';
import type { TReset, TResetErrors } from '../ResetPassword.types';

const useResetPasswordData = () => {
  const router = useRouter();
  const { token } = router.query;
  const { t } = useTranslation(['login', 'system_errors']);
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const [resetForm, setResetForm] = useState<TReset>(DEFAULT_RESET);
  const [resetFormErrors, setResetFormErrors] = useState<TResetErrors>({});

  useEffect(() => {
    if (router.isReady) {
      testRequest();
    }
  }, [token, resetPassword, router.isReady]);

  const testRequest = async () => {
    try {
      await resetPassword({ variables: { token, input: {} } });
    } catch (error) {
      captureSentryError(error);
      router.push(`/${ROUTES.INVALID_LINK}`);
    }
  };

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...resetForm,
      [name]: value,
    };
    setResetForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (resetFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = resetFormErrors;
      setResetFormErrors(errors);
    }
  };

  const onFinishSignIn = async () => {
    try {
      const { data } = await resetPassword({
        variables: { input: resetForm, token },
      });
      if (data) {
        router.push(`/${ROUTES.SIGNIN}`);
      }
    } catch (error) {
      captureSentryError(error, {
        payload: resetForm,
      });
      setResetFormErrors(error?.networkError?.message);
    }
  };

  const isValid = (): boolean => {
    const errors = {};

    if (!resetForm[RESET_FIELDS.PASSWORD].trim()) {
      errors[RESET_FIELDS.PASSWORD] = t('IM0001', {
        ns: 'system_errors',
        component: 'password',
      });
    }
    if (!resetForm[RESET_FIELDS.CONFIRM_PASSWORD].trim()) {
      errors[RESET_FIELDS.CONFIRM_PASSWORD] = t('IM0001', {
        ns: 'system_errors',
        component: 'password',
      });
    }
    if (
      resetForm[RESET_FIELDS.PASSWORD] !==
      resetForm[RESET_FIELDS.CONFIRM_PASSWORD]
    ) {
      errors[RESET_FIELDS.CONFIRM_PASSWORD] = t('IM0007', {
        ns: 'system_errors',
        component: 'password',
      });
    }
    setResetFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    handleChange,
    onFinishSignIn,
    isValid,
    loading: loading,
    resetForm,
    resetFormErrors,
    localErrorText,
  };
};

export { useResetPasswordData };
