import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useUnload } from '../../../../../../libs/web/hooks/useUnload';
import { ROUTES } from '../../../../constants/routes';
import { localIssueText } from '../../../Components/ErrorMessage';
import { GET_USER } from '../../../Layout/Header/Header.api';
import { DELETE_ADMIN } from '../../Admins.api';
import { GET_ADMIN, INVITE_ADMIN, UPDATE_ADMIN } from '../AdminForm.api';
import {
  ADMIN_FIELDS,
  DEFAULT_ADMIN,
  ERROR_TEXT,
} from '../AdminForm.constants';
import type { TAdminErrors, TAdminForm } from '../AdminForm.types';
import {
  checkAdminFormError,
  formatCreateData,
  formatEditData,
  formatGetData,
} from './useAdminData.helper';

const useAdminData = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['system_errors']);

  const editMode = useMemo(() => id !== 'new' && !!id, [id]);

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [adminForm, setAdminForm] = useState<TAdminForm>(DEFAULT_ADMIN);
  const [adminFormErrors, setAdminFormErrors] = useState<TAdminErrors>({});

  const { loading: loadingUser, data: currentUser } = useQuery(GET_USER);
  const isCurrentUser = useMemo(
    () => currentUser?.get_user?.id == id,
    [currentUser?.get_user?.id, id]
  );

  const [inviteAdmin, { loading: inviteLoading }] = useMutation(INVITE_ADMIN);
  const [updateAdmin, { loading: updateLoading }] = useMutation(UPDATE_ADMIN, {
    refetchQueries: ['GET_USER'],
    awaitRefetchQueries: true,
  });
  const [deleteAdmin, { loading: deleteLoading }] = useMutation(DELETE_ADMIN);

  const { loading: getLoading, data } = useQuery(GET_ADMIN, {
    skip: !editMode,
    variables: { uuid: id },
  });
  const loading =
    loadingUser ||
    inviteLoading ||
    updateLoading ||
    getLoading ||
    deleteLoading;

  const { isOpenWarning, openNextRoute, removeNextRoute, setUpdateState } =
    useUnload(true);

  useEffect(() => {
    setAdminForm(formatGetData(data?.get_admin));
  }, [data]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      [name]: value,
    };
    setAdminForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleUploadImages = (image) => {
    const updateInfo = {
      ...adminForm,
      [ADMIN_FIELDS.IMAGE_LINK]: image.link,
      [ADMIN_FIELDS.IMAGE]: image.id,
    };
    setAdminForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (adminFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = adminFormErrors;
      setAdminFormErrors(errors);
    }
  };

  const formatError = useCallback((name: string): string => {
    return `${ERROR_TEXT}${name}.`;
  }, []);

  const checkAdminForm = (): boolean => {
    const errors = checkAdminFormError(adminForm, formatError);
    setAdminFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async (formInfo) => {
    let formattedRequest = {};
    try {
      setUpdateState(false);
      if (editMode) {
        formattedRequest = formatEditData(data?.get_admin, adminForm);
        await updateAdmin({
          variables: { input: { ...formattedRequest, id }, uuid: id },
        });
      } else {
        formattedRequest = formatCreateData(adminForm);
        await inviteAdmin({
          variables: { input: { ...formattedRequest } },
        });
      }
      await router.push(`/${ROUTES.ADMINS}`);
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setUpdateState(true);
      setAdminFormErrors(error?.networkError?.message);
    }
  };

  const handleCancelButton = () => {
    setUpdateState(false);
    if (isOpenWarning) openNextRoute();
    else router.back();
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
    if (isOpenWarning) removeNextRoute();
  };

  const handleInactivate = async () => {
    try {
      setUpdateState(false);
      await deleteAdmin({ variables: { uuid: id } });
      await router.back();
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
      });
      setUpdateState(true);
      setAdminFormErrors(error?.networkError?.message);
    }
  };

  const handleDeleteButton = () => {
    setOpenDeleteModal(true);
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    localState: {
      openCancelModal: openCancelModal || isOpenWarning,
      openDeleteModal,
    },
    localActions: {
      setOpenCancelModal,
      setOpenDeleteModal,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleCancelButton,
      handleUploadImages,
      handleDeleteButton,
      handleInactivate,
      handleCloseCancelModal,
    },
    checkAdminForm,
    adminFormErrors,
    adminForm,
    localErrorText,
    formattedData: {
      editMode,
      isCurrentUser,
      loading,
    },
  };
};

export default useAdminData;
