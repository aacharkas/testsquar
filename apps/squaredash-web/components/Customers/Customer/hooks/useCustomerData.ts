import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../../libs/web/helpers/captureSentryError';
import { useToken } from '../../../../../../libs/web/hooks/useToken';
import { useUnload } from '../../../../../../libs/web/hooks/useUnload';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../constants/permissions';
import { ROLES } from '../../../../constants/roles';
import { ROUTES } from '../../../../constants/routes';
import { useAbility } from '../../../../lib/ability';
import { localIssueText } from '../../../Components/ErrorMessage';
import { GET_USER } from '../../../Layout/Header/Header.api';
import {
  CUSTOMER_CREATE,
  CUSTOMER_DELETE,
  CUSTOMER_GET,
  CUSTOMER_UPDATE,
} from '../CustomerForm.api';
import {
  CUSTOMER_FIELDS,
  DEFAULT_CUSTOMER,
  NEW_MEMBER_TEMPLATE,
} from '../CustomerForm.constants';
import type { TCustomerErrors, TCustomerForm } from '../CustomerForm.types';
import { TRelatedUser } from '../CustomerForm.types';
import {
  checkCustomerFormError,
  copyBillingAddressToShipping,
  formatCreateData,
  formatEditData,
  formatGetData,
  handleChangeFormatter,
} from './useCustomerFormData.helper';

const useCustomerData = () => {
  const router = useRouter();
  const ability = useAbility();
  const { id } = router.query;
  const { t } = useTranslation(['system_errors']);
  const editMode = useMemo(() => id !== 'new' && !!id, [id]);
  const [customerCreate, { loading: loadingCustomerCreate }] =
    useMutation(CUSTOMER_CREATE);
  const [customerUpdate, { loading: loadingCustomerUpdate }] =
    useMutation(CUSTOMER_UPDATE);
  const [customerDelete, { loading: loadingCustomerDelete }] =
    useMutation(CUSTOMER_DELETE);
  const { loading: loadingCustomer, data } = useQuery(CUSTOMER_GET, {
    skip: !editMode,
    variables: { uuid: id },
    fetchPolicy: 'cache-and-network',
  });

  const { data: userInfo } = useQuery(GET_USER, {
    skip: !useToken(),
  });
  const currentRole = useMemo(() => userInfo?.get_user?.role, [userInfo]);
  const isAddCurrentUser =
    currentRole === ROLES.COMPANY_ADMIN ||
    currentRole === ROLES.COMPANY_OWNER ||
    currentRole === ROLES.COMPANY_USER;
  const notAbleToChangeMember = useMemo(
    () =>
      ability.can(PERMISSION_ACTIONS.ALL, ROLES.COMPANY_USER) ||
      !ability.can(PERMISSION_ACTIONS.GET, PERMISSIONS.USER_LIST),
    [ability]
  );

  const [openCancelModal, setOpenCancelModal] = useState<boolean>(false);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [customerForm, setCustomerForm] =
    useState<TCustomerForm>(DEFAULT_CUSTOMER);
  const [customerFormErrors, setCustomerFormErrors] = useState<TCustomerErrors>(
    {}
  );

  const { isOpenWarning, openNextRoute, removeNextRoute, setUpdateState } =
    useUnload(true);

  const loading =
    loadingCustomerCreate ||
    loadingCustomerUpdate ||
    loadingCustomer ||
    loadingCustomerDelete;

  useEffect(() => {
    const userAsMember = notAbleToChangeMember
      ? { id: userInfo?.get_user?.id, name: userInfo?.get_user?.name }
      : null;
    setCustomerForm(formatGetData(data?.customerGet, userAsMember));
  }, [notAbleToChangeMember, data, userInfo]);

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
    let formattedRequest = {};
    try {
      setUpdateState(false);
      if (editMode) {
        formattedRequest = formatEditData(data?.customerGet, customerForm);
        const { data: dataCustomer } = await customerUpdate({
          variables: { input: { ...formattedRequest, id }, uuid: id },
        });
        if (!dataCustomer?.customerUpdate) {
          throw new Error();
        }
      } else {
        formattedRequest = formatCreateData(customerForm);
        await customerCreate({
          variables: { input: { ...formattedRequest } },
        });
      }
      router.push(`/${ROUTES.CUSTOMERS}`);
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
        payload: formattedRequest,
      });
      setUpdateState(true);

      if (editMode) {
        setCustomerFormErrors({
          common_issue: true,
          common_text: t('IM0053', { object: 'customer' }),
        });
      }
      if (error?.networkError?.message) {
        setCustomerFormErrors({
          common_issue: true,
          common_text: t('fill_form'),
          phone: error?.networkError?.message?.phone,
          email: error?.networkError?.message?.email,
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
      await customerDelete({ variables: { uuid: id } });
      await router.back();
    } catch (error) {
      captureSentryError(error, {
        entityId: id,
      });
      setUpdateState(true);
      setCustomerFormErrors(error?.networkError?.message);
    }
  };

  const handleDeleteButton = () => {
    setOpenDeleteModal(true);
  };

  const handleCloseCancelModal = () => {
    setOpenCancelModal(false);
    if (isOpenWarning) removeNextRoute();
  };

  const handleCopyShippingAddressFromBilling = () => {
    const updateInfo = copyBillingAddressToShipping(customerForm);
    setCustomerForm((prevState) => ({ ...prevState, ...updateInfo }));
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  const handleAddMember = () => {
    const currentMembers = customerForm[
      CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
    ] as TRelatedUser[];
    handleChange(
      [
        ...currentMembers,
        { ...NEW_MEMBER_TEMPLATE, id: currentMembers.length },
      ],
      CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
    );
  };

  const handleRemoveMember = (item) => {
    const currentMembers = customerForm[
      CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
    ] as TRelatedUser[];
    handleChange(
      currentMembers.filter((member) => member?.id !== item?.id),
      CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
    );
  };

  const handleChangeMember = (newValue, oldValue) => {
    const currentMembers = customerForm[
      CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
    ] as TRelatedUser[];
    handleChange(
      currentMembers.map((member) =>
        member?.id == oldValue?.id ? newValue : member
      ),
      CUSTOMER_FIELDS.RESPONSIBLE_MEMBER
    );
  };

  return {
    localState: {
      openCancelModal: openCancelModal || isOpenWarning,
      openDeleteModal,
      customerFormErrors,
      customerForm,
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
      handleCopyShippingAddressFromBilling,
      handleAddMember,
      handleRemoveMember,
      handleChangeMember,
    },
    checkCustomerForm,
    localErrorText,
    formattedData: {
      editMode,
      loading,
      customerId: id,
      notAbleToChangeMember,
      companyId: userInfo?.get_user?.companyId,
      currentRole,
      isAddCurrentUser,
    },
  };
};

export default useCustomerData;
