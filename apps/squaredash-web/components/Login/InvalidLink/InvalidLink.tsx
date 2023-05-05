import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../../libs/web/components/Button/Button';
import Typography from '../../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../../libs/web/constants/enums';
import { ROUTES } from '../../../constants/routes';
import Link from '../../Link';
import styles from '../Login.module.css';

interface IProps {
  resendLink?: boolean;
}

export function InvalidLink({ resendLink = false }: IProps) {
  const { t } = useTranslation(['login']);

  return (
    <>
      <div
        className={classNames(
          'bg-cover rounded-full h-24 w-24 mt-16 mb-8',
          styles['signup-company-error-image']
        )}
      />
      <Typography variant={ETextVariant.xl_3} bold className="mb-8">
        {resendLink ? t('invalid_link') : t('invalid_invite')}
      </Typography>
      {resendLink && (
        <Link href={`/${ROUTES.SIGNIN}`} type="link">
          <Button>
            <Typography
              variant={ETextVariant.base}
              medium
              className="flex items-center"
            >
              {t('return_button')}
            </Typography>
          </Button>
        </Link>
      )}
    </>
  );
}

export default InvalidLink;
