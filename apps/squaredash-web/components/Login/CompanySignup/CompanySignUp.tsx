import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Badge from '../../../../../libs/web/components/Badge/Badge';
import Button from '../../../../../libs/web/components/Button/Button';
import Input from '../../../../../libs/web/components/Input/Input';
import Select from '../../../../../libs/web/components/Select/Select';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import {
  AWARENESS_OPTIONS,
  JOBS_AMOUNT,
  PEOPLE_AMOUNT,
} from '../../Companies/CompanyProfile/CompanyProfile.constants';
import { ErrorMessage } from '../../Components/ErrorMessage';
import { COMPANY_SIGNUP_FIELDS } from './CompanySignUp.constants';
import { useCompanySignupData } from './hooks/useCompanySignupData';

export function SignUp() {
  const { t } = useTranslation(['companies', 'system_errors']);
  const {
    handleChange,
    onFinishCompanySignUp,
    isValid,
    loading,
    companySignUpForm,
    companySignUpFormErrors,
    localErrorText,
  } = useCompanySignupData();
  return (
    <>
      <Typography variant={ETextVariant.xl_3} bold className="mb-2">
        {t('general_info_sign_up')}
      </Typography>
      <Typography variant={ETextVariant.base} color={ETextColor.gray}>
        {t('provide_info')}
      </Typography>
      <Input
        label={t('company_name')}
        value={companySignUpForm[COMPANY_SIGNUP_FIELDS.COMPANY_NAME]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, COMPANY_SIGNUP_FIELDS.COMPANY_NAME)
        }
        className="mb-6 mt-8"
        isDisabled={loading}
        maxLength={200}
      />
      <Typography variant={ETextVariant.base} color={ETextColor.gray} medium>
        {t('how')} <span className="text-indigo-600">{t('many_people')}</span>{' '}
        {t('at_company')}
      </Typography>
      <div className="mt-2 mb-6 sm:mb-4">
        {PEOPLE_AMOUNT.map((item) => {
          return (
            <Badge
              key={item.id}
              size="big"
              className="mr-2.5 sm:mb-2 sm:mr-1.5"
              checked={
                item.value ==
                companySignUpForm[COMPANY_SIGNUP_FIELDS.PEOPLE_AMOUNT]
              }
              onClick={() =>
                handleChange(item.value, COMPANY_SIGNUP_FIELDS.PEOPLE_AMOUNT)
              }
            >
              {item.name}
            </Badge>
          );
        })}
      </div>
      <Typography variant={ETextVariant.base} color={ETextColor.gray} medium>
        {t('how_many_insurance')}{' '}
        <span className="text-indigo-600">{t('jobs_do_you_do')}</span>{' '}
        {t('each_month')}
      </Typography>
      <div className="mt-2 mb-6 sm:mb-4">
        {JOBS_AMOUNT.map((item) => {
          return (
            <Badge
              key={item.id}
              size="big"
              className="mr-2.5 sm:mb-2 sm:mr-1.5"
              checked={
                item.name ==
                companySignUpForm[COMPANY_SIGNUP_FIELDS.JOBS_AMOUNT]
              }
              onClick={() =>
                handleChange(item.name, COMPANY_SIGNUP_FIELDS.JOBS_AMOUNT)
              }
            >
              {item.name}
            </Badge>
          );
        })}
      </div>
      <Select
        label={t('how_did_you_hear')}
        options={AWARENESS_OPTIONS}
        placeholder="Select..."
        isDisabled={loading}
        onChangeValue={(e) => {
          handleChange(e, COMPANY_SIGNUP_FIELDS.AWARENESS);
        }}
        directionClass="lg:bottom-full"
        className="md:max-h-36 sm:max-h-36"
      />
      <ErrorMessage formError={companySignUpFormErrors} t={t}>
        <ExclamationCircleIcon className="h-5 w-5 mr-2" />
      </ErrorMessage>
      <Button
        size="big"
        className="w-full mt-5"
        disabled={loading}
        onClick={() => {
          if (isValid()) onFinishCompanySignUp();
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

export default SignUp;
