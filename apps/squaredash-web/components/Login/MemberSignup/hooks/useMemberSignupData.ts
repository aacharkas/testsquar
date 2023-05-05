import { useMutation } from '@apollo/client';
import jwt from 'jsonwebtoken';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useToken } from '../../../../../../libs/web/hooks/useToken';
import { ROUTES } from '../../../../constants/routes';
import { useDefineUserStartPage } from '../../../../hooks/useDefineUserStartPage';
import { varToken } from '../../../../lib/variables';
import { localIssueText } from '../../../Components/ErrorMessage';
import { MEMBER_SIGN_UP, VERIFY_INVITE } from '../MemberSignUp.api';
import { ACTIONS, DEFAULT_MEMBER_SIGNUP } from '../MemberSignUp.constants';
import type { TMemberSignup, TMemberSignupErrors } from '../MemberSignUp.types';
import {
  checkMemberSignupFormErrors,
  formatCreateData,
  formatGetData,
  isTokenExpired,
} from './useMemberSignupData.helper';

const useMemberSignupData = () => {
  const { t } = useTranslation(['system_errors']);
  const router = useRouter();
  const { token } = router.query;
  const isAuthorized = useToken();
  const [memberSignUp, { loading }] = useMutation(MEMBER_SIGN_UP);
  const [verifyInvite, { loading: loadingVerification }] = useMutation(
    VERIFY_INVITE,
    {
      variables: { token },
    }
  );

  const { loading: loadRedirect, redirectUserStartPage } =
    useDefineUserStartPage();

  const [memberSignUpForm, setMemberSignUpForm] = useState<TMemberSignup>(
    DEFAULT_MEMBER_SIGNUP
  );
  const [memberSignUpFormErrors, setMemberSignUpFormErrors] =
    useState<TMemberSignupErrors>({});

  const verifyMemberInvite = async () => {
    try {
      if (isTokenExpired(token as string)) {
        router.push(`/${ROUTES.INVALID_INVITE}`);
      }
      const { data } = await verifyInvite();
      if (data.verify_invite.action == ACTIONS.UPDATED) {
        router.push(`/${ROUTES.MEMBERS}`);
      } else {
        const tokenData = jwt.decode(token as string);
        setMemberSignUpForm(formatGetData(tokenData));
      }
    } catch (error) {
      captureSentryError(error);
      router.push(`/${ROUTES.INVALID_INVITE}`);
      console.log('error', error);
    }
  };

  useEffect(() => {
    if (isAuthorized) {
      router.push(`/${ROUTES.MEMBERS}`);
    } else if (token && token !== 'test') {
      verifyMemberInvite();
    }
  }, [token]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...memberSignUpForm,
      [name]: value,
    };
    setMemberSignUpForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (memberSignUpFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = memberSignUpFormErrors;
      setMemberSignUpFormErrors(errors);
    }
  };
  const onFinishMemberSignUp = async () => {
    const formattedRequest = formatCreateData(memberSignUpForm, token);
    try {
      const { data } = await memberSignUp({
        variables: { input: formattedRequest },
      });
      if (data) {
        const tokens = data?.memberSignUp;
        varToken({
          ...tokens,
        });
        redirectUserStartPage();
      }
    } catch (error) {
      captureSentryError(error, {
        payload: formattedRequest,
      });
      setMemberSignUpFormErrors(error?.networkError?.message);
    }
  };

  const isValid = (): boolean => {
    const errors = checkMemberSignupFormErrors(memberSignUpForm, t);
    setMemberSignUpFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    handleChange,
    onFinishMemberSignUp,
    isValid,
    loading: loading || loadRedirect || loadingVerification,
    memberSignUpForm,
    memberSignUpFormErrors,
    localErrorText,
  };
};

export { useMemberSignupData };
