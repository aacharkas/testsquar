import { ArrowPathIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import { ErrorMessage } from '../../Components/ErrorMessage';
import styles from '../Login.module.css';
import { useResendEmailData } from './hooks/useResendEmailData';

export function ResendEmail() {
  const { t } = useTranslation(['login', 'system_errors']);
  const {
    onClickResendEmail,
    handleClickBack,
    loading,
    error,
    successMessage,
  } = useResendEmailData();

  return (
    <>
      <Button theme="outline" onClick={handleClickBack}>
        <ChevronLeftIcon className="h-6 w-6 mr-2" />
        <Typography variant={ETextVariant.sm} medium color={ETextColor.primary}>
          {t('back')}
        </Typography>
      </Button>
      <div
        className={classNames(
          'bg-cover rounded-full h-24 w-24 mt-16 mb-8',
          styles['signup-second-page-image']
        )}
      />
      <Typography variant={ETextVariant.xl_3} bold className="mb-8">
        {t('IM0008', { ns: 'system_errors' })}
      </Typography>
      <Button theme="light" onClick={onClickResendEmail}>
        <div className="flex items-center">
          <Typography
            variant={ETextVariant.base}
            color={ETextColor.gray}
            medium
            className="flex items-center"
          >
            {loading ? (
              <Spinner size="xsmall" className="mr-1" />
            ) : (
              <ArrowPathIcon className="h-5 w-5 mr-2" />
            )}
            {t('resend')}
          </Typography>
        </div>
      </Button>
      <div className="mt-6">
        {successMessage && (
          <Typography variant={ETextVariant.base} color={ETextColor.gray}>
            {t('new_email_sent')}
          </Typography>
        )}
        {!!error && <ErrorMessage formError={error} t={t} />}
      </div>
    </>
  );
}

export default ResendEmail;
