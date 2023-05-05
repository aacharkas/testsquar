import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../../libs/web/constants/enums';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { RESET_FIELDS } from './ResetPassword.constants';
import { useResetPasswordData } from './hooks/useResetPasswordData';

export function ResetPassword() {
  const { t } = useTranslation(['login', 'system_errors']);
  const {
    handleChange,
    onFinishSignIn,
    isValid,
    loading,
    resetForm,
    resetFormErrors,
    localErrorText,
  } = useResetPasswordData();
  return (
    <>
      <Typography variant={ETextVariant.xl_3} bold className="mt-10">
        {t('update_password')}
      </Typography>
      <Typography variant={ETextVariant.base} className="my-2 medium block">
        {t('update_password_description')}
      </Typography>
      <Input
        password
        label={t('password')}
        value={resetForm[RESET_FIELDS.PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, RESET_FIELDS.PASSWORD)
        }
        className="my-6"
        error={!!resetFormErrors[RESET_FIELDS.PASSWORD]}
        errorText={localErrorText(
          resetFormErrors[RESET_FIELDS.PASSWORD],
          RESET_FIELDS.PASSWORD
        )}
        isDisabled={loading}
        maxLength={128}
      />
      <Input
        password
        label={t('confirm_password')}
        value={resetForm[RESET_FIELDS.CONFIRM_PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, RESET_FIELDS.CONFIRM_PASSWORD)
        }
        className="my-6"
        error={!!resetFormErrors[RESET_FIELDS.CONFIRM_PASSWORD]}
        errorText={localErrorText(
          resetFormErrors[RESET_FIELDS.CONFIRM_PASSWORD],
          RESET_FIELDS.CONFIRM_PASSWORD
        )}
        isDisabled={loading}
        maxLength={128}
      />
      <ErrorMessage formError={resetFormErrors} t={t} />
      <Button
        size="big"
        shape="rectangle"
        className="w-full mb-16"
        disabled={loading}
        onClick={() => {
          if (isValid()) onFinishSignIn();
        }}
      >
        <div className="flex items-center">
          {loading ? (
            <Spinner size="xsmall" />
          ) : (
            <Typography variant={ETextVariant.base}>{t('update')}</Typography>
          )}
        </div>
      </Button>
    </>
  );
}

export default ResetPassword;
