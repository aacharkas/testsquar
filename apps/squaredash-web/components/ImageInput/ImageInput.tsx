import classNames from 'classnames';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import Image from './Image';
import { UPLOAD_INSTANCE } from './ImageInput.constants';
import useImageInputData, { SUPPORTED_TYPES } from './hooks/useImageInputData';

interface IProps {
  src?: string;
  alt?: string;
  size?: 'small' | 'big';
  shape?: 'circle' | 'rectangle';
  isAvatar?: boolean;
  handleUploadImage: (val: any) => void;
  className?: string;
  error?: boolean;
  errorText?: string;
  instance?: string;
}

const ImageInput = ({
  src,
  alt,
  size = 'big',
  shape = 'rectangle',
  isAvatar = false,
  handleUploadImage,
  className,
  error,
  errorText,
  instance = UPLOAD_INSTANCE.COMPANY,
}: IProps) => {
  const { downloadPic, loading } = useImageInputData({
    handleUploadImage,
    instance,
  });
  const { t } = useTranslation(['buttons', 'system_errors']);
  return (
    <>
      <div className={classNames('flex items-center mt-1', className)}>
        {!loading ? (
          <>
            <Image
              src={src}
              alt={alt}
              size={size}
              shape={shape}
              isAvatar={isAvatar}
            />
            <Button theme="light" size="small" className="max-h-7 ml-4">
              <input
                type="file"
                accept={SUPPORTED_TYPES.join(', ')}
                className="opacity-0 absolute"
                onChange={downloadPic}
              />
              {t('change')}
            </Button>
          </>
        ) : (
          <Spinner size="small" />
        )}
      </div>
      <div>
        {!!errorText && error && (
          <p className="mt-2 text-sm text-red-600">{errorText}</p>
        )}
      </div>
    </>
  );
};

export default ImageInput;
