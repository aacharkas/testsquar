import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useUnload } from '../../../../../../libs/web/hooks/useUnload';
import { ROUTES } from '../../../../constants/routes';
import { localIssueText } from '../../../Components/ErrorMessage';
import {
  INSURANCE_CARRIER_CREATE,
  INSURANCE_CARRIER_DELETE,
  INSURANCE_CARRIER_GET,
  INSURANCE_CARRIER_UPDATE,
} from '../InsuranceCarrierForm.api';
import {
  DEFAULT_INSURANCE_CARRIER,
  INSURANCE_CARRIER_FIELDS,
} from '../InsuranceCarrierForm.constants';
import type {
  TInsuranceCarrierErrors,
  TInsuranceCarrierForm,
} from '../InsuranceCarrierForm.types';
import {
  checkInsuranceCarrierFormError,
  formatCreateData,
  formatGetData,
  processGoogleAddress,
} from './useInsuranceCarrierFormData.helper';

const useInsuranceCarrierData = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['system_errors']);

  const editMode = useMemo(() => id !== 'new' && !!id, [id]);
  const [insuranceCarrierCreate, { loading: loadingInsuranceCarrierCreate }] =
    useMutation(INSURANCE_CARRIER_CREATE);
  const [insuranceCarrierUpdate, { loading: loadingInsuranceCarrierUpdate }] =
    useMutation(INSURANCE_CARRIER_UPDATE);
  const [insuranceCarrierDelete, { loading: loadingInsuranceCarrierDelete }] =
    useMutation(INSURANCE_CARRIER_DELETE);
  const { loading: loadingInsuranceCarrier, data } = useQuery(
    INSURANCE_CARRIER_GET,
    {
      skip: !editMode,
      variables: { uuid: id },
    }
  );

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [insuranceCarrierForm, setInsuranceCarrierForm] =
    useState<TInsuranceCarrierForm>(DEFAULT_INSURANCE_CARRIER);
  const [insuranceCarrierFormErrors, setInsuranceCarrierFormErrors] =
    useState<TInsuranceCarrierErrors>({});

  const { isOpenWarning, openNextRoute, removeNextRoute, setUpdateState } =
    useUnload(true);

  const loading =
    loadingInsuranceCarrierCreate ||
    loadingInsuranceCarrierUpdate ||
    loadingInsuranceCarrier ||
    loadingInsuranceCarrierDelete;

  useEffect(() => {
    setInsuranceCarrierForm(formatGetData(data?.insuranceCarrierGet));
  }, [data]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    let updateInfo = {
      [name]: value,
    };
    if (name === INSURANCE_CARRIER_FIELDS.ADDRESS) {
      updateInfo = {
        ...updateInfo,
        ...processGoogleAddress(value),
      };
    } else if (name === INSURANCE_CARRIER_FIELDS.ADDRESS_NAME && !value) {
      updateInfo = {
        ...updateInfo,
        ...processGoogleAddress({}),
      };
    }
    setInsuranceCarrierForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleErrorFix = (name: string) => {
    if (insuranceCarrierFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = insuranceCarrierFormErrors;
      setInsuranceCarrierFormErrors(errors);
    }
  };

  const checkInsuranceCarrierForm = (): boolean => {
    const errors = checkInsuranceCarrierFormError(
      insuranceCarrierForm,
      localErrorText
    );
    setInsuranceCarrierFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async () => {
    let formattedRequest = {};
    try {
      setUpdateState(false);
      if (editMode) {
        formattedRequest = formatCreateData(insuranceCarrierForm, true);
        await insuranceCarrierUpdate({
          variables: { input: { ...formattedRequest, id }, uuid: id },
        });
      } else {
        formattedRequest = formatCreateData(insuranceCarrierForm, false);
        await insuranceCarrierCreate({
          variables: { input: { ...formattedRequest } },
        });
      }
      await router.push(`/${ROUTES.INSURANCE_CARRIERS}`);
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setUpdateState(true);
      setInsuranceCarrierFormErrors(error?.networkError?.message);
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
      await insuranceCarrierDelete({ variables: { uuid: id } });
      await router.back();
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
      });
      setUpdateState(true);
      setInsuranceCarrierFormErrors(error?.networkError?.message);
    }
  };

  const handleDeleteButton = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
    if (isOpenWarning) removeNextRoute();
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
      insuranceCarrierFormErrors,
      insuranceCarrierForm,
    },
    localActions: {
      setOpenCancelModal,
      setOpenDeleteModal,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleCancelButton,
      handleInactivate,
      handleDeleteButton,
      handleCloseCancelModal,
    },
    checkInsuranceCarrierForm,
    localErrorText,
    formattedData: {
      editMode,
      loading,
    },
  };
};

export default useInsuranceCarrierData;
