import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../../../libs/web/helpers/captureSentryError';
import { useToken } from '../../../../../../../../libs/web/hooks/useToken';
import { localIssueText } from '../../../../../Components/ErrorMessage';
import {
  CUSTOMER_FIELDS,
  DEFAULT_CUSTOMER,
} from '../../../../../Customers/Customer/CustomerForm.constants';
import type {
  TCustomerErrors,
  TCustomerForm,
  TCustomerGetResponse,
} from '../../../../../Customers/Customer/CustomerForm.types';
import { GET_USER } from '../../../../../Layout/Header/Header.api';
import { IMPORT_DETAILS_FIELDS } from '../../../ImportDetails.constants';
import type { TImportDetailsData } from '../../../ImportDetails.types';
import { CREATE_CUSTOMER_DATA } from '../CustomerForm.constants';
import {
  checkCustomerFormError,
  formatCreateData,
  formatGetData,
  handleChangeFormatter,
} from './useCustomerFormData.helper';

interface IProps {
  data: TCustomerGetResponse | TImportDetailsData;
  setImportCustomerData?: (val) => void;
  isOpenCustomer: boolean;
  setOpenCustomer: (val) => void;
  verifyOnActionSuccess: boolean;
  verifyImport: () => void;
}

const useCustomerFormData = ({
  data,
  setImportCustomerData,
  isOpenCustomer = null,
  setOpenCustomer = (open) => null,
  verifyImport = () => null,
  verifyOnActionSuccess = false,
}: IProps) => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['system_errors']);
  const [createNewCustomerData, { loading }] = useMutation(
    CREATE_CUSTOMER_DATA,
    {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    }
  );

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [customerForm, setCustomerForm] =
    useState<TCustomerForm>(DEFAULT_CUSTOMER);
  const [customerFormErrors, setCustomerFormErrors] = useState<TCustomerErrors>(
    {}
  );
  const [openModal, setOpenModal] = useState<boolean>(false);
  const { data: userInfo } = useQuery(GET_USER, {
    skip: !useToken(),
  });
  const currentUserId = useMemo(() => userInfo?.get_user?.id, [userInfo]);

  useEffect(() => {
    setCustomerForm(formatGetData(data as TCustomerGetResponse));
  }, [data]);

  useEffect(() => {
    setOpenModal(isOpenCustomer);
  }, [isOpenCustomer]);

  useEffect(() => {
    setOpenCustomer(openModal);
  }, [openModal]);

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = handleChangeFormatter(
      name,
      value,
      customerForm,
      handleErrorFix
    );
    setCustomerForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const handleErrorFix = (name: string) => {
    if (customerFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = customerFormErrors;
      setCustomerFormErrors(errors);
    }
  };

  const checkCustomerForm = (): boolean => {
    const errors = checkCustomerFormError(customerForm, localErrorText, t);
    setCustomerFormErrors(errors);
    return !!Object.keys(errors).length;
  };

  const handleSubmitClick = async () => {
    if (!checkCustomerForm()) {
      try {
        const createData = formatCreateData(customerForm);
        const formattedRequest = {
          ...createData,
          responsibleMemberIds: [currentUserId],
        };
        const { data: dataCustomer } = await createNewCustomerData({
          variables: {
            input: { customerDetails: { ...formattedRequest } },
            id: id,
          },
        });
        if (!dataCustomer?.createCustomerData) {
          throw new Error();
        }
        setOpenModal(false);
        setOpenCancelModal(false);
        setCustomerForm(formatGetData(data as TCustomerGetResponse));
        await setImportCustomerData((prevState) => ({
          ...prevState,
          ...{
            [IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME]:
              customerForm[CUSTOMER_FIELDS.NAME],
          },
        }));
        if (verifyOnActionSuccess) {
          await verifyImport();
        }
      } catch (error) {
        if (error?.networkError?.message) {
          setCustomerFormErrors(error?.networkError?.message);
          if (error?.networkError?.message?.phoneNumber) {
            setCustomerFormErrors({
              common_issue: true,
              common_text: t(error?.networkError?.message?.phoneNumber),
              phone: error?.networkError?.message?.phoneNumber,
            });
          }
          if (error?.networkError?.message?.common_text === 'IM0022') {
            setCustomerFormErrors({
              common_issue: true,
              common_text: t(error?.networkError?.message?.common_text),
              email: error?.networkError?.message?.common_text,
            });
          }
        }
      }
    }
  };
  const onFinishEdit = async (e) => {
    try {
      await createNewCustomerData({
        variables: {
          input: { customerId: e?.id },
          id: id,
        },
      });
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: { customerId: e?.id },
      });
      setCustomerFormErrors({
        updateError: true,
        ...(error?.networkError?.message ?? {}),
      });
    }
  };

  const handleCancelButton = () => {
    setOpenModal(false);
    setOpenCancelModal(false);
    setCustomerForm(formatGetData(data as TCustomerGetResponse));
    setCustomerFormErrors({});
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    customerState: {
      openCancelModal: openCancelModal,
      customerFormErrors,
      customerForm,
      loading,
      openModal,
    },
    customerActions: {
      setOpenCancelModal,
      setOpenModal,
    },
    handlers: {
      handleChange,
      handleSubmitClick,
      handleCancelButton,
      handleCloseCancelModal,
      onFinishEdit,
    },
    checkCustomerForm,
    localErrorText,
    formattedData: {
      customerId: id,
    },
  };
};

export default useCustomerFormData;
