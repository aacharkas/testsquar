import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useUnload } from '../../../../../../libs/web/hooks/useUnload';
import { ROUTES } from '../../../../constants/routes';
import { localIssueText } from '../../../Components/ErrorMessage';
import {
  MAX_IMAGE_SIZE,
  SUPPORTED_TYPES,
} from '../../../ImageInput/hooks/useImageInputData';
import { CREATE_COMPANY } from '../CompanyForm.api';
import {
  COMPANY_FIELDS,
  DEFAULT_COMPANY,
  ERROR_TEXT,
} from '../CompanyForm.constants';
import { TCompanyErrors, TCompanyForm } from '../CompanyForm.types';
import {
  checkCompanyFormError,
  formatCreateData,
} from './useCompanyFormData.helper';

const useCompanyFormData = () => {
  const router = useRouter();
  const { t } = useTranslation(['system_errors']);
  const [companyForm, setCompanyForm] = useState<TCompanyForm>(DEFAULT_COMPANY);
  const [companyFormErrors, setCompanyFormErrors] = useState<TCompanyErrors>(
    {}
  );
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  const [createCompany, { loading }] = useMutation(CREATE_COMPANY);

  const { isOpenWarning, openNextRoute, removeNextRoute, setUpdateState } =
    useUnload(true);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      [name]: value,
    };
    setCompanyForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleUploadAvatar = (avatar) => {
    handleErrorFix(COMPANY_FIELDS.COMPANY_AVATAR_LINK);
    if (avatar?.error) {
      setCompanyFormErrors({
        ...companyFormErrors,
        [COMPANY_FIELDS.COMPANY_AVATAR_LINK]: localErrorText(
          avatar?.error,
          COMPANY_FIELDS.COMPANY_AVATAR_LINK,
          {
            size: `${MAX_IMAGE_SIZE / 1048576} Mb`,
            types: SUPPORTED_TYPES.join(', '),
          }
        ),
      });
    } else {
      const updateInfo = {
        ...companyForm,
        [COMPANY_FIELDS.COMPANY_AVATAR_LINK]: avatar.link,
        [COMPANY_FIELDS.COMPANY_AVATAR]: avatar.id,
      };
      setCompanyForm(updateInfo);
    }
  };

  const handleErrorFix = (name: string) => {
    if (companyFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = companyFormErrors;
      setCompanyFormErrors(errors);
    }
  };

  const formatError = useCallback((name: string): string => {
    return `${ERROR_TEXT}${name}.`;
  }, []);

  const checkCompanyForm = (): boolean => {
    const errors = checkCompanyFormError(companyForm, formatError);
    setCompanyFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async (formInfo) => {
    let formattedRequest = {};
    setUpdateState(false);
    try {
      if (!checkCompanyForm()) {
        formattedRequest = formatCreateData(companyForm);
        await createCompany({
          variables: { input: { ...formattedRequest } },
        });
        router.push(`/${ROUTES.COMPANIES}`);
      }
    } catch (error) {
      captureSentryError(error, {
        payload: formattedRequest,
      });
      setUpdateState(true);
      setCompanyFormErrors(error?.networkError?.message);
    }
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
    if (isOpenWarning) removeNextRoute();
  };

  const handleCancelButton = () => {
    setUpdateState(false);
    if (isOpenWarning) openNextRoute();
    else router.back();
  };

  const localErrorText = useCallback(
    (text: string, field: string, options?: object): string =>
      localIssueText(text, t, { component: field, ...options }),
    [t]
  );

  return {
    localState: {
      companyFormErrors,
      companyForm,
    },
    localActions: {
      setOpenCancelModal,
    },
    handlers: {
      handleChange,
      handleUploadAvatar,
      handleSubmitClick,
      handleCancelButton,
      handleCloseCancelModal,
    },
    formattedData: {
      openCancelModal: openCancelModal || isOpenWarning,
      loading,
    },
    localErrorText,
  };
};

export default useCompanyFormData;
