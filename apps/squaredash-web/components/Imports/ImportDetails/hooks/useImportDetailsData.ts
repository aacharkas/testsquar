import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { DEFAULT_STATUSES } from '../../../../../../libs/web/constants/constants';
import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { localIssueText } from '../../../Components/ErrorMessage';
import { CUSTOMER_UPDATE } from '../../../Customers/Customer/CustomerForm.api';
import {
  CUSTOMER_GET_BY_DISPLAY_NAME,
  DELETE_IMPORT_ADJUSTERS_DATA,
  GET_IMPORT_DETAILS,
  INSURANCE_CARRIER_GET_BY_NAME,
  TRIGGER_IMPORT_VALIDATION,
  UPDATE_IMPORT_ADJUSTERS_DATA,
  UPDATE_IMPORT_CUSTOMER_DATA,
  UPDATE_IMPORT_GENERAL_DATA,
  UPDATE_IMPORT_INSURANCE_CARRIER_DATA,
  VERIFY_IMPORT,
} from '../ImportDetails.api';
import {
  DEFAULT_EDITED_FIELD,
  FILE_ACTIONS,
  IMPORT_DETAILS_FIELDS,
  IMPORT_DETAILS_FIRST_TAB,
  LOCALISATION_INFO,
} from '../ImportDetails.constants';
import {
  TDropdownFileItem,
  TEditedField,
  TImportDetailsCustomerData,
  TImportDetailsData,
  TImportDetailsInsuranceCarrierData,
  TLoadingData,
  TValidationDataItem,
} from '../ImportDetails.types';
import {
  checkCustomerNotFound,
  checkIfAnyValidationErrors,
  formatGetCustomerData,
  formatGetData,
  formatGetInsuranceCarrierData,
  formatGetValidationData,
  getCustomerDataMismatches,
} from './useImportDetailsData.helper';

const useImportDetailsData = () => {
  const router = useRouter();
  const { id } = router.query;
  const { t } = useTranslation(['system_errors']);

  const [editItem, setEditItem] = useState<TEditedField>(DEFAULT_EDITED_FIELD);
  const [useExistingModal, setUseExistingModal] = useState(false);

  const [currentTab, setCurrentTab] = useState<string>(
    IMPORT_DETAILS_FIRST_TAB
  );
  const [pdfVisible, setPdfVisible] = useState<boolean>(false);
  const [openPdfPage, setOpenPdfPage] = useState<boolean>(false);

  const [generalFieldsLoading, setGeneralFieldsLoading] =
    useState<TLoadingData>({});
  const [customerFieldsLoading, setCustomerFieldsLoading] =
    useState<TLoadingData>({});
  const [insuranceCarrierFieldsLoading, setInsuranceCarrierFieldsLoading] =
    useState<TLoadingData>({});
  const [adjusterFieldsLoading, setAdjusterFieldsLoading] =
    useState<TLoadingData>({});

  const [deleteAdjusterModal, setDeleteAdjusterModal] =
    useState<boolean>(false);
  const [addAdjusterModal, setAddAdjusterModal] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>('');
  const [validationData, setValidationData] = useState<TValidationDataItem[]>(
    []
  );
  const [openVerifyErrorModal, setOpenVerifyErrorModal] =
    useState<boolean>(false);
  const [customerMismatchFields, setCustomerMismatchFields] = useState([]);
  const [openCustomerCreateModal, setOpenCustomerCreateModal] = useState(false);
  const [verifyOnActionSuccess, setVerifyOnActionSuccess] = useState(false);

  const [importDetailsData, setImportDetailsData] =
    useState<TImportDetailsData>({});
  const [importCustomerData, setImportCustomerData] =
    useState<TImportDetailsCustomerData>({});
  const [importInsuranceCarrierData, setImportInsuranceCarrierData] =
    useState<TImportDetailsInsuranceCarrierData>({});

  const {
    loading: loadingImport,
    data,
    refetch,
  } = useQuery(GET_IMPORT_DETAILS, {
    variables: { uuid: id },
  });
  const { loading: loadingCustomer, data: existingCustomer } = useQuery(
    CUSTOMER_GET_BY_DISPLAY_NAME,
    {
      skip: !importCustomerData?.displayName,
      variables: { name: importCustomerData?.displayName },
    }
  );
  const existingCustomerData = useMemo(
    () => existingCustomer?.customerGet,
    [existingCustomer]
  );
  const { loading: loadingInsuranceCarrier, data: existingInsuranceCarrier } =
    useQuery(INSURANCE_CARRIER_GET_BY_NAME, {
      skip: !importInsuranceCarrierData?.name,
      variables: { name: importInsuranceCarrierData?.name },
    });
  const existingInsuranceCarrierData = useMemo(
    () => existingInsuranceCarrier?.insuranceCarrierGet,
    [existingInsuranceCarrier]
  );

  const [updateGeneralData, { loading: loadingGeneralDataUpdate }] =
    useMutation(UPDATE_IMPORT_GENERAL_DATA);
  const [updateCustomerData, { loading: loadingCustomerDataUpdate }] =
    useMutation(UPDATE_IMPORT_CUSTOMER_DATA);
  const [updateExistingCustomer, { loading: loadingExistingCustomerUpdate }] =
    useMutation(CUSTOMER_UPDATE);
  const [
    updateInsuranceCarrierData,
    { loading: loadingInsuranceCarrierDataUpdate },
  ] = useMutation(UPDATE_IMPORT_INSURANCE_CARRIER_DATA, {
    refetchQueries: ['GET_IMPORT_DETAILS'],
    awaitRefetchQueries: true,
  });
  const [updateAdjustersData, { loading: loadingAdjustersDataUpdate }] =
    useMutation(UPDATE_IMPORT_ADJUSTERS_DATA);
  const [deleteAdjustersData, { loading: loadingAdjustersDataDelete }] =
    useMutation(DELETE_IMPORT_ADJUSTERS_DATA, {
      refetchQueries: ['GET_IMPORT_DETAILS'],
      awaitRefetchQueries: true,
    });
  const [verifyImport, { loading: loadingVerifyImport }] =
    useMutation(VERIFY_IMPORT);
  const [triggerValidation] = useMutation(TRIGGER_IMPORT_VALIDATION);

  const loading = loadingImport || loadingVerifyImport;
  const modalLoading =
    loadingAdjustersDataDelete ||
    loadingCustomerDataUpdate ||
    loadingInsuranceCarrierDataUpdate;

  const ws = new WebSocket(process.env.NX_API_GW_DOMAIN_NAME);
  ws.onclose = () => {
    setChannelName('');
  };

  const loadingCustomerMismatch =
    loadingCustomerDataUpdate || loadingExistingCustomerUpdate;

  useEffect(() => {
    setImportDetailsData(formatGetData(data?.getImportDetails));
    if (data?.getImportDetails.customer) {
      setImportCustomerData({
        ...formatGetCustomerData(data?.getImportDetails),
        companyId: data?.getImportDetails?.companyId,
      });
    }
    if (data?.getImportDetails.insuranceCarrier) {
      setImportInsuranceCarrierData(
        formatGetInsuranceCarrierData(data?.getImportDetails)
      );
    }
  }, [data]);

  useEffect(() => {
    if (id) {
      setChannelName(`insurance-scope-self-validation-channel-${id}`);
      try {
        triggerValidation({
          variables: {
            scopeId: id,
            input: {},
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, [id]);

  useEffect(() => {
    if (channelName) {
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            action: 'subscribe-to-channel',
            channel: channelName,
          })
        );
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setValidationData((prevState) =>
          formatGetValidationData(data?.data, prevState)
        );
      };
    }
  }, [channelName]);

  useEffect(() => {
    const exitingFunction = () => {
      ws.close();
    };
    router.events.on('routeChangeStart', exitingFunction);

    return () => {
      router.events.off('routeChangeStart', exitingFunction);
    };
  }, []);

  const isVerified: boolean = useMemo(
    () => importDetailsData.status == DEFAULT_STATUSES.VERIFIED,
    [importDetailsData]
  );

  const localErrorText = useCallback(
    (text: string, field: string, options?: object): string =>
      localIssueText(text, t, {
        component: field,
        ...LOCALISATION_INFO,
        ...options,
      }),
    [t]
  );

  const onClickFileItem = (item: TDropdownFileItem) => {
    if (item.actionId === FILE_ACTIONS.VIEW) {
      setOpenPdfPage(true);
    } else if (item.actionId === FILE_ACTIONS.DOWNLOAD) {
      // TODO
    }
  };

  const handleChangeGeneralData = async (
    value,
    name: string,
    isPrice: boolean,
    isDate: boolean
  ) => {
    if (isPrice) {
      value = Number(value.replace(/[,]+/g, ''));
    } else if (isDate && !!value) {
      value = new Date(value).toISOString();
    }
    const updateInfo = {
      [name]: value,
    };
    setGeneralFieldsLoading({
      ...generalFieldsLoading,
      [name]: true,
    });
    setImportDetailsData((prevState) => ({ ...prevState, ...updateInfo }));
    await updateGeneralData({
      variables: { input: updateInfo, uuid: id },
    });
    setGeneralFieldsLoading({});
  };

  const handleChangeCustomerData = async (value, name: string) => {
    const updateInfo = {
      [name]: value,
    };
    setCustomerFieldsLoading({
      ...customerFieldsLoading,
      [name]: true,
    });
    setImportCustomerData((prevState) => ({ ...prevState, ...updateInfo }));
    await updateCustomerData({
      variables: {
        input: { [name]: value },
        uuid: importCustomerData[IMPORT_DETAILS_FIELDS.CUSTOMER_ID],
        scopeId: id,
      },
    });
    setCustomerFieldsLoading({});
  };

  const handleChangeInsuranceCarrierData = async (value, name: string) => {
    const updateInfo = {
      [name]: value,
    };
    setInsuranceCarrierFieldsLoading({
      ...insuranceCarrierFieldsLoading,
      [name]: true,
    });
    setImportInsuranceCarrierData((prevState) => ({
      ...prevState,
      ...updateInfo,
    }));
    await updateInsuranceCarrierData({
      variables: {
        input: { [name]: value },
        uuid: importInsuranceCarrierData[
          IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ID
        ],
        scopeId: id,
      },
    });
    setInsuranceCarrierFieldsLoading({});
  };

  const handleChangeAdjusterData = async (
    value,
    name: string,
    isPrice: boolean,
    isDate: boolean,
    adjusterId: string
  ) => {
    const updateInfo = {
      [name]: value,
    };
    setAdjusterFieldsLoading({
      [name]: true,
      id: adjusterId,
    });
    setImportInsuranceCarrierData((prevState) => ({
      ...prevState,
      ...updateInfo,
    }));
    await updateAdjustersData({
      variables: {
        input: { [name]: value },
        uuid: adjusterId,
        scopeId: id,
        carrierId:
          importInsuranceCarrierData[
            IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ID
          ],
      },
    });
    setAdjusterFieldsLoading({});
  };

  const handleDeleteAdjuster = async (adjusterId: string) => {
    try {
      await deleteAdjustersData({
        variables: {
          uuid: adjusterId,
          scopeId: id,
          carrierId:
            importInsuranceCarrierData[
              IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ID
            ],
        },
      });
      setDeleteAdjusterModal(false);
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
      });
    }
  };

  const handleVerifyImport = async () => {
    if (checkIfAnyValidationErrors(validationData)) {
      setOpenVerifyErrorModal(true);
    } else {
      const customerDataMismatches = getCustomerDataMismatches(validationData);
      if (customerDataMismatches.length) {
        setCustomerMismatchFields(customerDataMismatches);
      } else if (checkCustomerNotFound(validationData)) {
        setVerifyOnActionSuccess(true);
        setCurrentTab('summary');
        setTimeout(() => {
          setOpenCustomerCreateModal(true);
        }, 0);
      } else {
        await verifyImportAction();
      }
    }
  };

  const verifyImportAction = async () => {
    try {
      await verifyImport({
        variables: {
          scopeId: id,
          input: {},
        },
      });
      await refetch();
      setVerifyOnActionSuccess(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateScopeCustomer = async () => {
    const updateInfo = {};
    customerMismatchFields.forEach((mismatch) => {
      if (Array.isArray(mismatch.field)) {
        mismatch.field.forEach((item) => {
          updateInfo[item] = existingCustomerData[item];
        });
      } else {
        updateInfo[mismatch.field] = existingCustomerData[mismatch.field];
      }
    });
    setImportCustomerData((prevState) => ({ ...prevState, ...updateInfo }));
    try {
      await updateCustomerData({
        variables: {
          input: { ...updateInfo },
          uuid: importCustomerData[IMPORT_DETAILS_FIELDS.CUSTOMER_ID],
          scopeId: id,
        },
      });
      setCustomerMismatchFields([]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdateExistingCustomer = async () => {
    const updateInfo = {};
    customerMismatchFields.forEach((mismatch) => {
      if (Array.isArray(mismatch.field)) {
        mismatch.field.forEach((item) => {
          updateInfo[item] = importCustomerData[item];
        });
      } else {
        updateInfo[mismatch.field] = importCustomerData[mismatch.field];
      }
    });
    setImportCustomerData((prevState) => ({ ...prevState, ...updateInfo }));
    try {
      await updateExistingCustomer({
        variables: {
          input: { ...updateInfo },
          uuid: importCustomerData[IMPORT_DETAILS_FIELDS.CUSTOMER_ID],
        },
      });
      setCustomerMismatchFields([]);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    localState: {
      currentTab,
      pdfVisible,
      isVerified,
      openPdfPage,
      importCustomerData,
      editItem,
      addAdjusterModal,
      deleteAdjusterModal,
      useExistingModal,
      openVerifyErrorModal,
      customerMismatchFields,
      openCustomerCreateModal,
      verifyOnActionSuccess,
    },
    localActions: {
      setCurrentTab,
      setPdfVisible,
      setOpenPdfPage,
      setImportCustomerData,
      setEditItem,
      setAddAdjusterModal,
      setDeleteAdjusterModal,
      setUseExistingModal,
      setOpenVerifyErrorModal,
      setCustomerMismatchFields,
      setOpenCustomerCreateModal,
    },
    formattedData: {
      existingInsuranceCarrierData,
      existingCustomerData,
      validationData,
      importDetailsData,
      importCustomerData,
      importInsuranceCarrierData,
      loading,
      modalLoading,
      loadingCustomerMismatch,
      generalFieldsLoading,
      customerFieldsLoading,
      insuranceCarrierFieldsLoading,
      adjusterFieldsLoading,
    },
    handlers: {
      handleChangeGeneralData,
      handleChangeCustomerData,
      handleChangeInsuranceCarrierData,
      handleChangeAdjusterData,
      handleDeleteAdjuster,
      handleVerifyImport,
      handleUpdateScopeCustomer,
      handleUpdateExistingCustomer,
      verifyImportAction,
    },
    onClickFileItem,
    localErrorText,
  };
};

export default useImportDetailsData;
