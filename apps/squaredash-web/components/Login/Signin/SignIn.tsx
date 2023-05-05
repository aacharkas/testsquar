import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../../libs/web/constants/enums';
import { ROUTES } from '../../../constants/routes';
import { ErrorMessage } from '../../Components/ErrorMessage';
import Link from '../../Link';
import styles from '../Login.module.css';
import { SIGNIN_FIELDS } from './Signin.constants';
import { useSigninData } from './hooks/useSigninData';

export function SignIn() {
  const { t } = useTranslation(['login', 'system_errors']);
  const {
    handleChange,
    onFinishSignIn,
    isValid,
    loading,
    signInForm,
    signInFormErrors,
    localErrorText,
  } = useSigninData();
  return (
    <>
      <Typography variant={ETextVariant.xl_3} bold className="mb-8">
        {t('welcome_back')}
        <span className={styles['login-title']}>{t('squaredash')}</span>
      </Typography>
      <Input
        label={t('work_email')}
        type="email"
        value={signInForm[SIGNIN_FIELDS.EMAIL]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, SIGNIN_FIELDS.EMAIL)
        }
        className="mb-6"
        error={!!signInFormErrors[SIGNIN_FIELDS.EMAIL]}
        errorText={localErrorText(
          signInFormErrors[SIGNIN_FIELDS.EMAIL],
          SIGNIN_FIELDS.EMAIL
        )}
        isDisabled={loading}
        maxLength={254}
      />
      <Input
        password
        label={t('password')}
        value={signInForm[SIGNIN_FIELDS.PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, SIGNIN_FIELDS.PASSWORD)
        }
        className="mb-6"
        error={!!signInFormErrors[SIGNIN_FIELDS.PASSWORD]}
        errorText={localErrorText(
          signInFormErrors[SIGNIN_FIELDS.PASSWORD],
          SIGNIN_FIELDS.PASSWORD
        )}
        isDisabled={loading}
        maxLength={128}
      />
      <ErrorMessage formError={signInFormErrors} t={t} />
      <Link href={`/${ROUTES.FORGOT_PASSWORD}`} type="link">
        <Typography variant={ETextVariant.sm} className="mb-6">
          {t('forgot_password')}
        </Typography>
      </Link>
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
            <Typography variant={ETextVariant.base}>{t('continue')}</Typography>
          )}
        </div>
      </Button>
      <Link href={`/${ROUTES.SIGNUP}`} type="link">
        <Typography variant={ETextVariant.sm}>
          {t('have_no_account')}
        </Typography>
      </Link>
    </>
  );
}

export default SignIn;
