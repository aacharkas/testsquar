import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Typography from '../../../../../libs/web/components/Typography/Typography';
import {
  ETextColor,
  ETextVariant,
} from '../../../../../libs/web/constants/enums';
import styles from './CompanyProfile.module.css';

interface IProps {
  src?: string;
  alt?: string;
}

const CompanyProfileLogo = ({ src, alt }: IProps) => {
  const { t } = useTranslation('companies');

  return (
    <>
      {src && alt ? (
        <img
          src={src}
          alt={alt}
          className={classNames(
            'border rounded-md h-24 w-24 sm:h-20 sm:w-20 object-cover',
            styles['company-logo']
          )}
        />
      ) : (
        <div
          className={classNames(
            'flex justify-center items-center bg-auto bg-right bg-no-repeat border rounded-md h-24 min-w-[96px] sm:h-20 sm:min-w-[80px]',
            styles['company-no-logo']
          )}
        >
          <Typography
            variant={ETextVariant.base}
            color={ETextColor.gray}
            medium
          >
            {t('no_logo')}
          </Typography>
        </div>
      )}
    </>
  );
};

export default CompanyProfileLogo;
