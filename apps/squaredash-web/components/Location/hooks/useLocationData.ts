import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { useUnload } from '../../../../../libs/web/hooks/useUnload';
import { localIssueText } from '../../Components/ErrorMessage';
import {
  LOCATION_CREATE,
  LOCATION_DELETE,
  LOCATION_GET,
  LOCATION_UPDATE,
} from '../LocationForm.api';
import {
  DEFAULT_LOCATION,
  LOCALISATION_INFO,
  LOCATION_FIELDS,
} from '../LocationForm.constants';
import type { TLocationErrors, TLocationForm } from '../LocationForm.types';
import {
  checkLocationFormError,
  formatCreateData,
  formatGetData,
  processGoogleAddress,
} from './useLocationData.helper';

const useLocationData = () => {
  const router = useRouter();
  const { id, companyId } = router.query;
  const { t } = useTranslation(['system_errors']);

  const editMode = useMemo(() => id !== 'new' && !!id, [id]);
  const [locationCreate, { loading: loadingLocationCreate }] =
    useMutation(LOCATION_CREATE);
  const [locationUpdate, { loading: loadingLocationUpdate }] =
    useMutation(LOCATION_UPDATE);
  const [locationDelete, { loading: loadingLocationDelete }] =
    useMutation(LOCATION_DELETE);
  const { loading: loadingLocation, data } = useQuery(LOCATION_GET, {
    skip: !editMode,
    variables: { uuid: id },
  });

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);
  const [locationForm, setLocationForm] =
    useState<TLocationForm>(DEFAULT_LOCATION);
  const [locationFormErrors, setLocationFormErrors] = useState<TLocationErrors>(
    {}
  );

  const { isOpenWarning, openNextRoute, removeNextRoute, setUpdateState } =
    useUnload(true);

  const loading =
    loadingLocationCreate ||
    loadingLocationUpdate ||
    loadingLocation ||
    loadingLocationDelete;

  useEffect(() => {
    setLocationForm(formatGetData(data?.location_get));
  }, [data]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    let updateInfo = {
      [name]: value,
    };
    if (name === LOCATION_FIELDS.ADDRESS) {
      updateInfo = {
        ...updateInfo,
        ...processGoogleAddress(value),
      };
    }
    setLocationForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleErrorFix = (name: string) => {
    if (locationFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = locationFormErrors;
      setLocationFormErrors(errors);
    }
  };

  const checkLocationForm = (): boolean => {
    const errors = checkLocationFormError(locationForm, localErrorText);
    setLocationFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async (formInfo) => {
    let formattedRequest = {};
    try {
      setUpdateState(false);
      if (editMode) {
        // Uncomment when beck will get only updated data
        // const formattedRequest = formatEditData(
        //   data?.location_get,
        //   locationForm
        // );

        formattedRequest = formatCreateData(locationForm, true, id);
        const { data } = await locationUpdate({
          variables: { input: { ...formattedRequest, id }, uuid: id },
        });

        if (!data.location_update) {
          throw new Error();
        }
      } else {
        formattedRequest = formatCreateData(locationForm, false, companyId);
        await locationCreate({
          variables: { input: { ...formattedRequest, companyId: companyId } },
        });
      }
      await router.back();
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setUpdateState(true);
      if (editMode) {
        setLocationFormErrors({
          common_issue: true,
          common_text: t('IM0053', { object: 'location' }),
        });
      } else {
        setLocationFormErrors({
          updateError: true,
          ...(error?.networkError?.message ?? {}),
        });
      }
    }
  };

  const handleCancelButton = () => {
    setUpdateState(false);
    if (isOpenWarning) openNextRoute();
    else router.back();
  };

  const handleInactivate = async () => {
    try {
      setUpdateState(false);
      await locationDelete({ variables: { uuid: id } });
      await router.back();
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
      });
      setUpdateState(true);
      setLocationFormErrors(error?.networkError?.message);
    }
  };

  const handleDeleteButton = () => {
    if (locationForm[LOCATION_FIELDS.IS_MAIN_OFFICE]) {
      setOpenWarningModal(true);
    } else {
      setOpenDeleteModal(true);
    }
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
    if (isOpenWarning) removeNextRoute();
  };

  const localErrorText = useCallback(
    (text: string, field: string, options?: object): string =>
      localIssueText(text, t, {
        component: field,
        ...LOCALISATION_INFO,
        ...options,
      }),
    [t]
  );

  return {
    localState: {
      openCancelModal: openCancelModal || isOpenWarning,
      openDeleteModal,
      openWarningModal,
    },
    localActions: {
      setOpenCancelModal,
      setOpenDeleteModal,
      setOpenWarningModal,
      setLocationFormErrors,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleCancelButton,
      handleInactivate,
      handleDeleteButton,
      handleCloseCancelModal,
    },
    checkLocationForm,
    locationFormErrors,
    locationForm,
    localErrorText,
    formattedData: {
      editMode,
      isMain: data?.location_get?.isMain,
      loading,
    },
  };
};

export default useLocationData;
