import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useToken } from '../../../../../../libs/web/hooks/useToken';
import { ROUTES } from '../../../../constants/routes';
import { USER_STATUSES } from '../../../../constants/userStatuses';
import { useDefineUserStartPage } from '../../../../hooks/useDefineUserStartPage';
import { varToken, varUserId } from '../../../../lib/variables';
import { GET_USER } from '../../../Companies/CompanyProfile/CompanyProfile.api';
import { localIssueText } from '../../../Components/ErrorMessage';
import { CHANGE_EMAIL, SIGN_IN, VERIFY_CHANGE_EMAIL } from '../Signin.api';
import { DEFAULT_SIGNIN, SIGNIN_FIELDS } from '../Signin.constants';
import type { TSignin, TSigninErrors } from '../Signin.types';

const useSigninData = () => {
  const router = useRouter();
  const { token } = router.query;
  const { t } = useTranslation(['login', 'system_errors']);
  const [signIn, { loading, client }] = useMutation(SIGN_IN);
  const [verifyChangeEmail, { loading: loadingEmailVerification }] =
    useMutation(VERIFY_CHANGE_EMAIL, {
      variables: { token },
    });
  const [changeEmail, { loading: loadingChangeEmail }] =
    useMutation(CHANGE_EMAIL);
  const {
    loading: loadingUser,
    data: dataUser,
    error: userError,
  } = useQuery(GET_USER, {
    skip: !useToken(),
    fetchPolicy: 'cache-and-network',
  });
  const { loading: loadRedirect, redirectUserStartPage } =
    useDefineUserStartPage();

  const [signInForm, setSignInForm] = useState<TSignin>(DEFAULT_SIGNIN);
  const [signInFormErrors, setSignInFormErrors] = useState<TSigninErrors>({});

  const verifyEmailFunction = async () => {
    const { data } = await verifyChangeEmail();
    if (data) {
      setSignInForm({
        [SIGNIN_FIELDS.EMAIL]: data?.verify_email?.email,
        [SIGNIN_FIELDS.PASSWORD]: '',
      });
    }
  };

  useEffect(() => {
    if (token) verifyEmailFunction();
  }, [token]);

  useEffect(() => {
    if (dataUser) {
      if (dataUser?.get_user?.status === USER_STATUSES.ACTIVE) {
        varUserId(dataUser?.get_user?.id);
        redirectUserStartPage();
      } else {
        varToken(undefined);
        client.resetStore();
        router.push(`/${ROUTES.INVITATION_EMAIL}`);
      }
    } else if (userError) {
      setSignInFormErrors({
        ...signInFormErrors,
        common: 'Get user error',
      });
    }
  }, [dataUser, userError]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...signInForm,
      [name]: value,
    };
    setSignInForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (signInFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = signInFormErrors;
      setSignInFormErrors(errors);
    }
  };

  const onFinishSignIn = async () => {
    if (token) {
      await changeEmail({
        variables: {
          input: {
            token: token,
            password: signInForm?.[SIGNIN_FIELDS.PASSWORD],
          },
        },
      });
    }

    try {
      const { data } = await signIn({
        variables: { input: signInForm },
      });
      if (data) {
        const tokens = data?.signIn;
        varToken({
          ...tokens,
        });
      }
    } catch (error) {
      captureSentryError(error);
      setSignInFormErrors(error?.networkError?.message);
    }
  };

  const isValid = (): boolean => {
    const errors = {};

    if (!signInForm[SIGNIN_FIELDS.EMAIL].trim()) {
      errors[SIGNIN_FIELDS.EMAIL] = t('IM0001', {
        ns: 'system_errors',
        component: 'email',
      });
    }
    if (!signInForm[SIGNIN_FIELDS.PASSWORD].trim()) {
      errors[SIGNIN_FIELDS.PASSWORD] = t('IM0001', {
        ns: 'system_errors',
        component: 'password',
      });
    }
    setSignInFormErrors(errors);
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
    loading:
      loading || loadRedirect || loadingEmailVerification || loadingChangeEmail,
    signInForm,
    signInFormErrors,
    localErrorText,
  };
};

export { useSigninData };
