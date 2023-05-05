import { ArrowPathIcon, ChevronLeftIcon } from '@heroicons/react/24/outline';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Spinner from '../../../../../libs/web/components/Spinner/Spinner';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import { ROUTES } from '../../../constants/routes';
import styles from '../Login.module.css';

export function EmailReset() {
  const router = useRouter();
  const { t } = useTranslation(['login']);

  return (
    <>
      <div
        className={classNames(
          'bg-cover rounded-full h-24 w-24 mt-16 mb-8',
          styles['signup-second-page-image']
        )}
      />
      <Typography variant={ETextVariant.xl_3} bold className="mb-8">
        {t('reset_please_check_email')}
      </Typography>
      <Typography variant={ETextVariant.base} className="mb-9 block">
        {t('reset_description')}
      </Typography>
      <Button onClick={() => router.push(`/${ROUTES.SIGNIN}`)}>
        <div className="flex items-center">
          <Typography
            variant={ETextVariant.base}
            medium
            className="flex items-center"
          >
            {t('return_button')}
          </Typography>
        </div>
      </Button>
    </>
  );
}

export default EmailReset;
