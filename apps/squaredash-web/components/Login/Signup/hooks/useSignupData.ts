import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { ROUTES } from '../../../../constants/routes';
import { varToken } from '../../../../lib/variables';
import { localIssueText } from '../../../Components/ErrorMessage';
import { SIGN_UP } from '../Signup.api';
import { DEFAULT_SIGNUP, SIGNUP_FIELDS } from '../Signup.constants';
import type { TSignup } from '../Signup.types';

const useSignupData = () => {
  const router = useRouter();
  const { t } = useTranslation(['login', 'system_errors']);
  const [signUp, { loading }] = useMutation(SIGN_UP);

  const [signUpForm, setSignUpForm] = useState<TSignup>(DEFAULT_SIGNUP);
  const [signUpFormErrors, setSignUpFormErrors] = useState<TSignup>({});

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...signUpForm,
      [name]: value,
    };
    setSignUpForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (signUpFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = signUpFormErrors;
      setSignUpFormErrors(errors);
    }
  };

  const onFinishSignUp = async () => {
    try {
      const { data } = await signUp({
        variables: { input: signUpForm },
      });
      if (data) {
        // const tokens = data?.signUp;
        // varToken({
        //   ...tokens,
        // });
        router.push(`/${ROUTES.INVITATION_EMAIL}`);
      }
    } catch (error) {
      captureSentryError(error, {
        payload: signUpForm,
      });
      setSignUpFormErrors(error?.networkError?.message);
    }
  };

  const isValid = (): boolean => {
    const errors = {};
    if (!signUpForm[SIGNUP_FIELDS.NAME].trim()) {
      errors[SIGNUP_FIELDS.NAME] = t('IM0001', {
        ns: 'system_errors',
        component: 'name',
      });
    }
    if (!signUpForm[SIGNUP_FIELDS.EMAIL].trim()) {
      errors[SIGNUP_FIELDS.EMAIL] = t('IM0001', {
        ns: 'system_errors',
        component: 'email',
      });
    }
    if (!signUpForm[SIGNUP_FIELDS.PASSWORD].trim()) {
      errors[SIGNUP_FIELDS.PASSWORD] = t('IM0001', {
        ns: 'system_errors',
        component: 'password',
      });
    } else if (signUpForm[SIGNUP_FIELDS.PASSWORD].length < 8) {
      errors[SIGNUP_FIELDS.PASSWORD] = t('IM0003', {
        ns: 'system_errors',
      });
    }
    setSignUpFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    handleChange,
    onFinishSignUp,
    isValid,
    loading,
    signUpForm,
    signUpFormErrors,
    localErrorText,
  };
};

export { useSignupData };
