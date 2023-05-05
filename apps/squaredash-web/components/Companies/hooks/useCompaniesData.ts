import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { COMPANY_STATUSES } from '../../../constants/companyStatuses';
import { ROUTES } from '../../../constants/routes';
import { localIssueText } from '../../Components/ErrorMessage';
import { CHANGE_COMPANY_STATUS, GET_COMPANIES } from '../Companies.api';
import {
  COMPANIES_ACTIONS,
  DEFAULT_COMPANIES_FILTERS,
  ITEMS_PER_PAGE,
} from '../Companies.constants';
import { TCompany, TDropdownItem, TFilters } from '../Companies.types';

const useCompaniesData = () => {
  const router = useRouter();
  const { t } = useTranslation(['system_errors']);
  const [filters, setFilters] = useState<TFilters>(DEFAULT_COMPANIES_FILTERS);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const { loading: loadingCompanies, data } = useQuery(GET_COMPANIES, {
    variables: {
      sortOrder: filters.sortOrder,
      sortCol: 'name',
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
    },
    fetchPolicy: 'cache-and-network',
  });
  const [changeStatus, { loading: loadingChangeStatus }] = useMutation(
    CHANGE_COMPANY_STATUS,
    {
      refetchQueries: ['GET_COMPANIES'],
      awaitRefetchQueries: true,
    }
  );

  const companiesCount: number = useMemo(
    () => data?.companies?.totalCount,
    [data]
  );
  const totalPages: number = useMemo(
    () => Math.ceil(data?.companies?.totalCount / ITEMS_PER_PAGE),
    [data]
  );

  const companiesData = useMemo(() => data?.companies?.rows ?? [], [data]);

  const loading =
    (loadingCompanies && !companiesData?.length) || loadingChangeStatus;

  const searchCompaniesDebounce = useDebounce((value) => {
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
    if (!search || search?.length > 2) searchCompaniesDebounce(search);
  }, [search]);

  const handleActionOnTableItem = (
    item: TDropdownItem,
    selectedItem: TCompany
  ): void => {
    if (item.type === COMPANIES_ACTIONS.CHANGE_STATUS) {
      handleChangeStatus(selectedItem);
    } else if (item.type === COMPANIES_ACTIONS.VIEW) {
      handleOnCompanyClick(selectedItem);
    }
  };

  const handleOnCompanyClick = (company: TCompany) => {
    router.push(`/${ROUTES.COMPANIES_COMPANY_INFO}?id=${company?.id}`);
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

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    localState: {
      search,
      filters,
      currentPage,
    },
    localActions: {
      setSearch,
      setFilters,
      setCurrentPage,
    },
    formattedData: {
      companiesCount,
      loading,
      totalPages,
      companiesData,
    },
    handlers: {
      handleOnCompanyClick,
      handleActionOnTableItem,
    },
    localErrorText,
    handleChangeStatus,
  };
};

export { useCompaniesData };
