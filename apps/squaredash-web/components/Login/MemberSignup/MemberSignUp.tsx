import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
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
import { ErrorMessage } from '../../Components/ErrorMessage';
import Link from '../../Link';
import styles from '../Login.module.css';
import { MEMBER_SIGNUP_FIELDS } from './MemberSignUp.constants';
import { useMemberSignupData } from './hooks/useMemberSignupData';

export function MemberSignUp() {
  const { t } = useTranslation(['login', 'system_errors']);
  const {
    handleChange,
    onFinishMemberSignUp,
    isValid,
    loading,
    memberSignUpForm,
    memberSignUpFormErrors,
    localErrorText,
  } = useMemberSignupData();

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
        value={memberSignUpForm[MEMBER_SIGNUP_FIELDS.FULL_NAME]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, MEMBER_SIGNUP_FIELDS.FULL_NAME)
        }
        className="mb-6 mt-8"
        isDisabled={loading}
        maxLength={50}
        error={!!memberSignUpFormErrors[MEMBER_SIGNUP_FIELDS.FULL_NAME]}
        errorText={localErrorText(
          memberSignUpFormErrors[MEMBER_SIGNUP_FIELDS.FULL_NAME],
          MEMBER_SIGNUP_FIELDS.FULL_NAME
        )}
      />
      <Input
        password
        label={t('password')}
        value={memberSignUpForm[MEMBER_SIGNUP_FIELDS.PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, MEMBER_SIGNUP_FIELDS.PASSWORD)
        }
        className="mb-6"
        isDisabled={loading}
        error={!!memberSignUpFormErrors[MEMBER_SIGNUP_FIELDS.PASSWORD]}
        errorText={localErrorText(
          memberSignUpFormErrors[MEMBER_SIGNUP_FIELDS.PASSWORD],
          MEMBER_SIGNUP_FIELDS.PASSWORD
        )}
        maxLength={128}
      />
      <Input
        password
        label={t('confirm_password')}
        value={memberSignUpForm[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD)
        }
        className="mb-6"
        isDisabled={loading}
        error={!!memberSignUpFormErrors[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD]}
        errorText={localErrorText(
          memberSignUpFormErrors[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD],
          MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD
        )}
        maxLength={128}
      />
      <ErrorMessage formError={memberSignUpFormErrors} t={t}>
        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
      </ErrorMessage>
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
        className="w-full mt-5"
        disabled={loading}
        onClick={() => {
          if (isValid()) onFinishMemberSignUp();
        }}
      >
        {loading ? (
          <Spinner size="xsmall" />
        ) : (
          <Typography variant={ETextVariant.base}>{t('continue')}</Typography>
        )}
      </Button>
    </>
  );
}

export default MemberSignUp;
