import { useLazyQuery, useMutation } from '@apollo/client';
import { ChangeEvent, useEffect, useState } from 'react';

import { GET_UPLOAD_LINK, UPLOAD_FILE } from '../ImageInput.api';
import { uploadFileFunction } from './useFileUploadData.helper';

export const MAX_IMAGE_SIZE = 10485760;
export const SUPPORTED_TYPES = ['.png', '.jpg', '.jpeg'];

const useImageInputData = ({ handleUploadImage, instance }) => {
  const [getLink, { loading }] = useLazyQuery(GET_UPLOAD_LINK);
  const [uploadFile, { loading: uploadLoading }] = useMutation(UPLOAD_FILE);
  const [imageUrl, setImageUrl] = useState<string | ArrayBuffer>('');
  const [error, setError] = useState<string>('');
  const [uploadId, setUploadId] = useState<string>('');

  useEffect(() => {
    if (uploadId && imageUrl) {
      handleUploadImage({
        link: imageUrl,
        id: uploadId,
      });
    }
  }, [uploadId, imageUrl]);

  useEffect(() => {
    if (error) {
      handleUploadImage({
        error,
      });
    }
  }, [error]);

  const clearState = () => {
    setError('');
    setImageUrl('');
    setUploadId('');
  };

  const downloadPic = async (e: ChangeEvent<HTMLInputElement>) => {
    uploadFileFunction({
      e,
      setFileUrl: setImageUrl,
      SUPPORTED_TYPES,
      getLink,
      uploadFile,
      instance,
      MAX_FILE_SIZE: MAX_IMAGE_SIZE,
      clearState,
      setUploadId,
      setError,
    });
  };
  return {
    downloadPic,
    loading: loading || uploadLoading,
  };
};

export default useImageInputData;
