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
import {
  PRIVACY_POLICY,
  TERMS_OF_SERVICE,
} from '../../../constants/externalLinks';
import { ROUTES } from '../../../constants/routes';
import { ErrorMessage } from '../../Components/ErrorMessage';
import Link from '../../Link';
import styles from '../Login.module.css';
import { SIGNUP_FIELDS } from './Signup.constants';
import { useSignupData } from './hooks/useSignupData';

export function SignUp() {
  const {
    handleChange,
    onFinishSignUp,
    isValid,
    loading,
    signUpForm,
    signUpFormErrors,
    localErrorText,
  } = useSignupData();
  const { t } = useTranslation(['login', 'system_errors']);
  return (
    <>
      <Typography variant={ETextVariant.xl_3} bold className="mb-2">
        {t('welcome_to')}
        <span className={styles['login-title']}>{t('squaredash')}</span>
      </Typography>
      <Typography variant={ETextVariant.base} color={ETextColor.gray}>
        {t('enter_details')}
      </Typography>
      <Input
        label={t('full_name')}
        value={signUpForm[SIGNUP_FIELDS.NAME]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, SIGNUP_FIELDS.NAME)
        }
        className="mb-6 mt-8"
        isDisabled={loading}
        error={!!signUpFormErrors[SIGNUP_FIELDS.NAME]}
        errorText={localErrorText(
          signUpFormErrors[SIGNUP_FIELDS.NAME],
          SIGNUP_FIELDS.NAME
        )}
      />
      <Input
        label={t('work_email')}
        value={signUpForm[SIGNUP_FIELDS.EMAIL]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, SIGNUP_FIELDS.EMAIL)
        }
        className="mb-6"
        isDisabled={loading}
        error={!!signUpFormErrors[SIGNUP_FIELDS.EMAIL]}
        errorText={localErrorText(
          signUpFormErrors[SIGNUP_FIELDS.EMAIL],
          SIGNUP_FIELDS.EMAIL
        )}
        type="email"
        maxLength={254}
      />
      <Input
        password
        label={t('password')}
        value={signUpForm[SIGNUP_FIELDS.PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, SIGNUP_FIELDS.PASSWORD)
        }
        className="mb-6"
        isDisabled={loading}
        error={!!signUpFormErrors[SIGNUP_FIELDS.PASSWORD]}
        errorText={localErrorText(
          signUpFormErrors[SIGNUP_FIELDS.PASSWORD],
          SIGNUP_FIELDS.PASSWORD
        )}
        maxLength={128}
      />
      <ErrorMessage formError={signUpFormErrors} t={t} />
      <Typography variant={ETextVariant.sm} className="mb-6 font-light">
        {t('you_agree')}
        <Link target="_blank" href={TERMS_OF_SERVICE} type="link">
          {t('terms')}
        </Link>
        {t('and')}
        <Link target="_blank" href={PRIVACY_POLICY} type="link">
          {t('privacy_policy')}
        </Link>
      </Typography>
      <Button
        size="big"
        shape="rectangle"
        className="w-full mb-16"
        onClick={() => {
          if (isValid()) onFinishSignUp();
        }}
        disabled={loading}
      >
        <div className="flex items-center">
          {loading ? (
            <Spinner size="xsmall" />
          ) : (
            <Typography variant={ETextVariant.base}>{t('continue')}</Typography>
          )}
        </div>
      </Button>
      <Link href={`/${ROUTES.SIGNIN}`} type="link">
        <Typography variant={ETextVariant.sm}>{t('have_account')}</Typography>
      </Link>
    </>
  );
}

export default SignUp;
