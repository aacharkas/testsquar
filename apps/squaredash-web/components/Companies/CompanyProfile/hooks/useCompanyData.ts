import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useUnload } from '../../../../../../libs/web/hooks/useUnload';
import { COMPANY_STATUSES } from '../../../../constants/companyStatuses';
import { ROUTES } from '../../../../constants/routes';
import { localIssueText } from '../../../Components/ErrorMessage';
import {
  MAX_IMAGE_SIZE,
  SUPPORTED_TYPES,
} from '../../../ImageInput/hooks/useImageInputData';
import { LOCATION_DELETE } from '../../../Location/LocationForm.api';
import { LOCATION_ACTIONS } from '../../../Location/LocationForm.constants';
import { CHANGE_COMPANY_STATUS } from '../../Companies.api';
import { GET_COMPANY, GET_USER, UPDATE_COMPANY } from '../CompanyProfile.api';
import {
  COMPANY_PROFILE_FIELDS,
  DEFAULT_COMPANY_PROFILE,
  ERROR_TEXT,
} from '../CompanyProfile.constants';
import {
  TCompany,
  TCompanyErrors,
  TCompanyFormDefault,
} from '../CompanyProfile.types';
import {
  checkCompanyFormError,
  formatEditData,
  formatGetData,
} from './useCompanyData.helper';

const useCompanyData = () => {
  const router = useRouter();
  const { t } = useTranslation(['system_errors']);
  const { loading: loadingUser, data: dataUser } = useQuery(GET_USER);
  const { id: queryCompanyId } = router.query;

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [companyForm, setCompanyForm] = useState<TCompanyFormDefault>(
    DEFAULT_COMPANY_PROFILE
  );
  const [companyFormErrors, setCompanyFormErrors] = useState<TCompanyErrors>(
    {}
  );

  const {
    updateState,
    isOpenWarning,
    openNextRoute,
    removeNextRoute,
    setUpdateState,
  } = useUnload(false);

  const companyId = useMemo(
    () => dataUser && dataUser?.get_user?.companyId,
    [dataUser]
  );
  const { loading: loadingCompany, data } = useQuery(GET_COMPANY, {
    variables: { companyId: queryCompanyId || companyId },
    fetchPolicy: 'cache-and-network',
  });

  const [locationDelete] = useMutation(LOCATION_DELETE, {
    refetchQueries: ['GET_COMPANY'],
  });
  const [companyUpdate, { loading: loadingCompanyUpdate }] =
    useMutation(UPDATE_COMPANY);
  const [changeStatus, { loading: loadingChangeStatus }] = useMutation(
    CHANGE_COMPANY_STATUS,
    {
      refetchQueries: ['GET_COMPANY'],
      awaitRefetchQueries: true,
    }
  );

  const loading =
    loadingCompany ||
    loadingCompanyUpdate ||
    loadingUser ||
    loadingChangeStatus;

  useEffect(() => {
    if (data) {
      restoreChanges();
    }
  }, [data]);

  const restoreChanges = () => {
    setCompanyForm(formatGetData(data?.get_company));
  };

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...companyForm,
      [name]: value,
    };
    setCompanyForm(updateInfo);
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

  const handleUpdate = async (id) => {
    const formattedRequest = formatEditData(
      data,
      companyForm,
      !!queryCompanyId
    );
    try {
      await companyUpdate({
        variables: { companyId: id, input: formattedRequest },
      });
      setUpdateState(false);
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setCompanyFormErrors(error?.networkError?.message);
    }
  };

  const handleChangeStatus = async (selectedItem) => {
    const uuid = selectedItem?.id;
    const input = {
      status:
        selectedItem.status == COMPANY_STATUSES.ACTIVE
          ? COMPANY_STATUSES.INACTIVE
          : COMPANY_STATUSES.ACTIVE,
    };
    try {
      if (uuid) {
        await changeStatus({
          variables: {
            input,
            uuid: uuid,
          },
        });
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: uuid,
        payload: input,
      });
      console.log(error);
    }
  };

  const handleAction = async (item) => {
    if (item?.actionId === LOCATION_ACTIONS.EDIT) {
      router.push(`/${ROUTES.LOCATION}?id=${item?.id}`);
    } else if (item?.actionId === LOCATION_ACTIONS.DELETE) {
      try {
        await locationDelete({ variables: { uuid: item?.id } });
      } catch (error) {
        captureSentryError(error, {
          entityId: item?.id,
        });
        console.log(error);
      }
    } else {
      console.log('Type not found!');
    }
  };

  const handleUploadAvatar = (avatar) => {
    handleErrorFix(COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK);
    if (avatar?.error) {
      setCompanyFormErrors({
        ...companyFormErrors,
        [COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK]: localErrorText(
          avatar?.error,
          COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK,
          {
            size: `${MAX_IMAGE_SIZE / 1048576} Mb`,
            types: SUPPORTED_TYPES.join(', '),
          }
        ),
      });
    } else {
      const updateInfo = {
        ...companyForm,
        [COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK]: avatar.link,
        [COMPANY_PROFILE_FIELDS.COMPANY_AVATAR]: avatar.id,
      };
      setCompanyForm(updateInfo);
    }
  };

  const discardChanges = () => {
    restoreChanges();
    setUpdateState(false);
    setOpenModal(false);
    if (isOpenWarning) openNextRoute();
  };

  const handleSaveChanges = async () => {
    if (!checkCompanyForm()) {
      await handleUpdate(companyForm[COMPANY_PROFILE_FIELDS.COMPANY_ID]);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    if (isOpenWarning) removeNextRoute();
  };

  const localErrorText = useCallback(
    (text: string, field: string, options?: object): string =>
      localIssueText(text, t, { component: field, ...options }),
    [t]
  );
  return {
    state: {
      editMode: updateState,
      openModal: openModal || isOpenWarning,
    },
    localActions: {
      setEditMode: setUpdateState,
      setOpenModal,
    },
    handlers: {
      handleChange,
      handleUpdate,
      handleAction,
      handleUploadAvatar,
      handleSaveChanges,
      handleCloseModal,
      handleChangeStatus,
    },
    formattedData: {
      isMoreDetailed: !!queryCompanyId,
      loading,
      companyFormErrors,
      companyForm: companyForm as TCompany,
    },
    checkCompanyForm,
    discardChanges,
    localErrorText,
  };
};

export default useCompanyData;
