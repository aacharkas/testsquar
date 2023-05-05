import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { CUSTOMER_TYPE } from '../../../constants/roles';
import { ROLES } from '../../../constants/roles';
import { ROUTES } from '../../../constants/routes';
import { useAbility } from '../../../lib/ability';
import { localIssueText } from '../../Components/ErrorMessage';
import { CUSTOMER_DELETE, CUSTOMER_GET } from '../Customer/CustomerForm.api';
import { GET_CUSTOMERS } from '../Customers.api';
import {
  CUSTOMERS_ACTIONS,
  DEFAULT_CUSTOMERS_FILTERS,
  ITEMS_PER_PAGE,
} from '../Customers.constants';
import { TCustomer, TDropdownItem, TFilters } from '../Customers.types';
import {
  fillCustomers,
  fillRespMembers,
  fillTypes,
} from './useCustomersData.helper';

const useCustomersData = () => {
  const router = useRouter();
  const ability = useAbility();
  const { t } = useTranslation(['system_errors']);

  const [filters, setFilters] = useState<TFilters>(DEFAULT_CUSTOMERS_FILTERS);
  const [search, setSearch] = useState<string>('');

  const [detailsId, setDetailsId] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean | string>(
    false
  );

  const types = useMemo(() => fillTypes(filters.resTypes), [filters.resTypes]);
  const customers = useMemo(
    () => fillCustomers(filters.parents),
    [filters.parents]
  );
  const respMembers = useMemo(
    () => fillRespMembers(filters.responsibleMembers),
    [filters.responsibleMembers]
  );

  const notAbleToRemoveMember = useMemo(
    () =>
      ability.can(PERMISSION_ACTIONS.ALL, ROLES.COMPANY_USER) ||
      !ability.can(PERMISSION_ACTIONS.DELETE, PERMISSIONS.CUSTOMER),
    [ability]
  );

  const { loading: loadingCustomers, data } = useQuery(GET_CUSTOMERS, {
    variables: {
      category: types === CUSTOMER_TYPE.ALL ? '' : types,
      parents: customers.join(','),
      responsibleMembers: respMembers.join(','),
      sortOrder: filters.sortOrder,
      sortCol: 'displayName',
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { loading: loadingCustomerDetails, data: customerDataDetails } =
    useQuery(CUSTOMER_GET, {
      skip: !detailsId,
      variables: { uuid: detailsId },
      fetchPolicy: 'cache-and-network',
    });

  const [customerDelete, { loading: loadingCustomerDelete }] =
    useMutation(CUSTOMER_DELETE);

  const customersCount: number = useMemo(
    () => data?.customers?.totalCount,
    [data?.customers?.totalCount]
  );
  const totalPages: number = useMemo(
    () => Math.ceil(data?.customers?.totalCount / ITEMS_PER_PAGE),
    [data?.customers?.totalCount]
  );
  const customerDetails = useMemo(
    () => customerDataDetails?.customerGet ?? {},
    [customerDataDetails]
  );

  const customersData = useMemo(() => data?.customers?.rows ?? [], [data]);

  const loading =
    (loadingCustomers && !customersData?.length) || loadingCustomerDelete;

  const searchCustomersDebounce = useDebounce((value) => {
    if (!value) {
      setFilters({
        ...filters,
        search: value,
        skip: (currentPage - 1) * ITEMS_PER_PAGE,
      });
    } else {
      setFilters({ ...filters, search: value, skip: 0 });
    }
  });
  useEffect(() => {
    if (!search || search?.length > 2) searchCustomersDebounce(search);
  }, [search]);

  const handleActionOnTableItem = (
    item: TDropdownItem,
    selectedItem: TCustomer
  ): void => {
    if (item.type === CUSTOMERS_ACTIONS.EDIT) {
      router.push(item.href);
    } else if (item.type === CUSTOMERS_ACTIONS.DELETE) {
      setOpenWarningModal(item?.id);
    } else if (item.type === CUSTOMERS_ACTIONS.VIEW) {
      handleOnCustomersClick(selectedItem);
    }
  };

  const handleRemoveCustomer = async () => {
    try {
      await customerDelete({ variables: { uuid: openWarningModal } });
      await router.push(`/${ROUTES.CUSTOMERS}`);
    } catch (error) {
      captureSentryError(error, {
        entityId: openWarningModal,
      });
      console.log(error);
    } finally {
      setOpenWarningModal(false);
    }
  };

  const handleOnCustomersClick = (item) => {
    setDetailsId(item?.id);
    setOpenModal(true);
  };
  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );
  return {
    localState: {
      search,
      filters,
      openModal,
      openWarningModal,
      currentPage,
    },
    localActions: {
      setSearch,
      setFilters,
      setOpenModal,
      setOpenWarningModal,
      setCurrentPage,
    },
    formattedData: {
      customersCount,
      loading,
      totalPages,
      customersData,
      customerDetails,
      loadingCustomerDetails,
      customers,
      respMembers,
      notAbleToRemoveMember,
    },
    handlers: {
      handleOnCustomersClick,
      handleActionOnTableItem,
      handleRemoveCustomer,
    },
    localErrorText,
  };
};

export { useCustomersData };
