import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import { ROUTES } from '../../../constants/routes';
import { ErrorMessage } from '../../Components/ErrorMessage';
import Link from '../../Link';
import { FORGOT_FIELDS } from './ForgotPassword.constants';
import { useForgotPasswordData } from './hooks/useForgotPasswordData';

export function ForgotPassword() {
  const { t } = useTranslation(['login', 'system_errors']);
  const {
    handleChange,
    onSendForgot,
    isValid,
    loading,
    signInForm,
    signInFormErrors,
    localErrorText,
  } = useForgotPasswordData();
  return (
    <>
      <Link
        href={`/${ROUTES.SIGNIN}`}
        type="link"
        className="flex items-center"
      >
        <ChevronLeftIcon className="h-6 w-6 mr-2" />
        <Typography variant={ETextVariant.sm} medium color={ETextColor.primary}>
          {t('back_sign_in')}
        </Typography>
      </Link>
      <Typography variant={ETextVariant.xl_3} bold className="mt-10">
        {t('reset_password')}
      </Typography>
      <Typography variant={ETextVariant.base} className="my-2 medium block">
        {t('enter_your_password')}
      </Typography>
      <Input
        label={t('work_email')}
        type="email"
        value={signInForm[FORGOT_FIELDS.EMAIL]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, FORGOT_FIELDS.EMAIL)
        }
        className="my-10"
        error={!!signInFormErrors[FORGOT_FIELDS.EMAIL]}
        errorText={localErrorText(
          signInFormErrors[FORGOT_FIELDS.EMAIL],
          FORGOT_FIELDS.EMAIL
        )}
        isDisabled={loading}
        maxLength={254}
      />
      <ErrorMessage formError={signInFormErrors} t={t} />
      <Button
        size="big"
        shape="rectangle"
        className="w-full mb-16"
        disabled={loading}
        onClick={() => {
          if (isValid()) onSendForgot();
        }}
      >
        <div className="flex items-center">
          {loading ? (
            <Spinner size="xsmall" />
          ) : (
            <Typography variant={ETextVariant.base}>
              {t('reset_instruction')}
            </Typography>
          )}
        </div>
      </Button>
    </>
  );
}

export default ForgotPassword;
