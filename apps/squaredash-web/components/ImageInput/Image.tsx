import { UserIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { imageInputHelper } from './ImageInput.helper';
import styles from './ImageInput.module.css';

interface IProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'big';
  shape?: 'circle' | 'rectangle';
  isAvatar?: boolean;
}

const Image = ({
  src,
  alt,
  size = 'big',
  shape = 'rectangle',
  isAvatar,
}: IProps) => {
  const { t } = useTranslation('buttons');
  const classStyles = imageInputHelper(size, shape);

  return (
    <>
      {src && alt ? (
        <img
          src={src}
          alt={alt}
          className={classNames(
            'border border-gray-300 object-cover',
            classStyles.sizeStyle,
            classStyles.shapeStyle
          )}
        />
      ) : (
        <div
          className={classNames(
            'flex justify-center items-center bg-auto bg-right bg-no-repeat border border-gray-300 bg-gray-100',
            !isAvatar && styles['no-logo'],
            isAvatar ? 'items-baseline' : 'items-center',
            classStyles.sizeStyle,
            classStyles.shapeStyle
          )}
        >
          {!isAvatar ? (
            <Typography
              variant={ETextVariant.base}
              color={ETextColor.gray}
              medium
            >
              {t('no_logo')}
            </Typography>
          ) : (
            <UserIcon className="text-gray-300 h-16 w-16" aria-hidden="true" />
          )}
        </div>
      )}
    </>
  );
};

export default Image;
