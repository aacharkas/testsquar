// import { captureSentryError } from 'libs/web/helpers/captureSentryError';
import { captureSentryError } from 'libs/web/helpers/captureSentryError';

import { UPLOAD_INSTANCE } from '../ImageInput.constants';

export const uploadFileFunction = async (props) => {
  const {
    e,
    SUPPORTED_TYPES,
    getLink,
    uploadFile,
    instance,
    MAX_FILE_SIZE,
    setError,
    uploadNewScope,
    setChannelName,
  } = props;
  const isNotInsuranceScope = instance !== UPLOAD_INSTANCE.INSURANCE_SCOPE;
  try {
    isNotInsuranceScope && props?.clearState();
    const file = e?.target?.files?.[0];
    if (file) {
      if (file.size > MAX_FILE_SIZE) {
        throw { customError: true, value: 'IM0031' };
      }
      const fileReader = new FileReader();
      fileReader.addEventListener('load', (evt) => {
        isNotInsuranceScope && props?.setFileUrl(evt?.target?.result);
      });
      fileReader.readAsDataURL(file);

      const extension = file?.type.split('/')[1];
      if (!SUPPORTED_TYPES.join('').includes(extension)) {
        throw { customError: true, value: 'IM0030' };
      }
      const { data: link } = await getLink({
        variables: {
          extension,
          instance,
        },
      });
      const path = link?.get_link?.signedUrl;
      if (!isNotInsuranceScope) {
        await setChannelName(`private-import-scope-${link?.get_link?.id}`);
      }
      const fileName = file?.name ?? '';

      const formData = new FormData();
      formData.append('file', e?.target?.files[0], link?.get_link?.id);
      await uploadFile({
        variables: {
          path,
          payload: formData,
          transform: (body: FormData, headers: Headers) => {
            return {
              body: file,
              headers,
            };
          },
        },
      });
      if (!isNotInsuranceScope) {
        await uploadNewScope({
          variables: {
            input: {
              objectId: link?.get_link?.id,
              initialDocumentName: fileName,
            },
          },
        });
      }
      isNotInsuranceScope && props?.setUploadId(link?.get_link?.id);
    } else {
      throw `${isNotInsuranceScope ? 'Image' : 'File'} was not uploaded`;
    }
  } catch (err) {
    captureSentryError(err);
    console.log(err);
    if (err?.customError) {
      setError(err?.value);
    } else {
      setError('common');
    }
  }
};
