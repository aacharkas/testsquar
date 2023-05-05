import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';

import { captureSentryError } from '../../../../../../../../libs/web/helpers/captureSentryError';
import { localIssueText } from '../../../../../Components/ErrorMessage';
import { CREATE_IMPORT_ADJUSTERS_DATA } from '../AdjusterForm.api';
import { ADJUSTER_FIELDS, DEFAULT_ADJUSTER } from '../AdjusterForm.constants';
import { TAdjusterErrors, TAdjusterForm } from '../AdjusterForm.types';
import {
  checkAdjusterFormError,
  formatCreateData,
  processGoogleAddress,
} from './useAdjusterData.helper';

interface IProps {
  setAddAdjusterModal: (value: boolean) => void;
  carrierId: string;
}

const useAdjusterData = ({ setAddAdjusterModal, carrierId }: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['system_errors']);

  const [createAdjuster, { loading: loadingCreateAdjuster }] = useMutation(
    CREATE_IMPORT_ADJUSTERS_DATA,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );
  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);

  const [adjusterForm, setAdjusterForm] =
    useState<TAdjusterForm>(DEFAULT_ADJUSTER);
  const [adjusterFormErrors, setAdjusterFormErrors] = useState<TAdjusterErrors>(
    {}
  );

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    let updateInfo = {
      [name]: value,
    };
    if (name === ADJUSTER_FIELDS.ADDRESS) {
      updateInfo = {
        ...updateInfo,
        ...processGoogleAddress(value),
      };
    } else if (name === ADJUSTER_FIELDS.ADDRESS_NAME && !value) {
      updateInfo = {
        ...updateInfo,
        ...processGoogleAddress({}),
      };
    }
    setAdjusterForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleErrorFix = (name: string) => {
    if (adjusterFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = adjusterFormErrors;
      setAdjusterFormErrors(errors);
    }
  };

  const checkAdjusterForm = (): boolean => {
    const errors = checkAdjusterFormError(adjusterForm, localErrorText);
    setAdjusterFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async () => {
    let formattedRequest = {};
    try {
      if (!checkAdjusterForm()) {
        formattedRequest = formatCreateData(adjusterForm);
        await createAdjuster({
          variables: {
            input: { ...formattedRequest },
            scopeId: id,
            carrierId: carrierId,
          },
        });
        setAddAdjusterModal(false);
        setOpenCancelModal(false);
        clearData();
      }
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setAdjusterFormErrors({
        updateError: true,
        ...(error?.networkError?.message ?? {}),
      });
    }
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  const clearData = () => {
    setAdjusterForm(DEFAULT_ADJUSTER);
    setAdjusterFormErrors({});
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  const handleCancelButton = () => {
    clearData();
    setAddAdjusterModal(false);
    setOpenCancelModal(false);
    setAddAdjusterModal(false);
  };

  return {
    localState: {
      openCancelModal,
    },
    localActions: {
      setOpenCancelModal,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleCloseCancelModal,
      handleCancelButton,
    },
    adjusterFormErrors,
    adjusterForm,
    localErrorText,
    formattedData: {
      loading: loadingCreateAdjuster,
    },
  };
};

export default useAdjusterData;
