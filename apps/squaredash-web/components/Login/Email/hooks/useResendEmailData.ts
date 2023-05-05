import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { RESEND_EMAIL } from '../ResendEmail.api';
import { TError } from '../ResendEmail.types';

const useResendEmailData = () => {
  const [resendEmail, { loading }] = useMutation(RESEND_EMAIL);
  const [successMessage, setSuccessMessage] = useState<boolean>(false);
  const [error, setError] = useState<TError>({});
  const router = useRouter();

  const handleClickBack = () => {
    router.back();
  };

  const onClickResendEmail = async () => {
    setSuccessMessage(false);
    setError({});
    try {
      const { data } = await resendEmail();
      if (data) {
        setSuccessMessage(true);
      }
    } catch (error) {
      captureSentryError(error);
      setError(error?.networkError?.message);
    }
  };

  return {
    onClickResendEmail,
    handleClickBack,
    loading,
    error,
    successMessage,
  };
};

export { useResendEmailData };
