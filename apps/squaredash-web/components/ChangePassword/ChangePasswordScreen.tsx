import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import ChangePassword from './ChangePassword';
import { useChangePasswordData } from './hooks/useChangePasswordData';
import Message from '../../../../libs/web/components/Message/Message';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../libs/web/constants/enums';

export function ChangePasswordScreen() {
  const router = useRouter();
  const { t } = useTranslation(['buttons', 'system_errors']);
  const [openMessage, setOpenMessage]=useState(false);

  const onSuccess = () => {
    setOpenMessage(true);
    router.back();
  };

  const {
    handleChange,
    onFinishChangePassword,
    loading,
    changePasswordForm,
    changePasswordFormErrors,
    localErrorText,
  } = useChangePasswordData({ onSuccess });

  return (
    <>
      {loading && <Spinner contentSize />}
      <div className="mt-4 p-5 bg-white">
        <ChangePassword
          loading={loading}
          handleChange={handleChange}
          changePasswordForm={changePasswordForm}
          changePasswordFormErrors={changePasswordFormErrors}
          localErrorText={localErrorText}
        />
        <div className="flex justify-between gap-4">
          <Button
            theme="light"
            size="big"
            className="flex-1"
            onClick={onSuccess}
            disabled={loading}
          >
            {t('cancel')}
          </Button>
          <Button
            size="big"
            onClick={onFinishChangePassword}
            className="flex-1"
            disabled={loading}
          >
            {t('change')}
          </Button>
        </div>
      </div>
      <Message show={openMessage} closeMessage={() => setOpenMessage(false)} top={true}>
        <Typography variant={ETextVariant.sm} medium>
          {t('password_updated')}
        </Typography>
      </Message>
    </>
  );
}

export default ChangePasswordScreen;
