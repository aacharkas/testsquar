import { useMutation, useQuery } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { localIssueText } from '../../Components/ErrorMessage';
import {
  INSURANCE_CARRIER_DELETE,
  INSURANCE_CARRIER_GET,
} from '../InsuranceCarrier/InsuranceCarrierForm.api';
import {
  DEFAULT_INSURANCE_CARRIES_FILTERS,
  INSURANCE_CARRIER_ACTIONS,
  ITEMS_PER_PAGE,
} from '../InsuranceCarriers.constants';
import {
  TDropdownItem,
  TFilters,
  TInsuranceCarriers,
} from '../InsuranceCarriers.types';
import { GET_INSURANCE_CARRIES } from '../InsureanceCarriers.api';

const useInsuranceCarriers = () => {
  const router = useRouter();
  const { t } = useTranslation(['system_errors']);
  const [filters, setFilters] = useState<TFilters>(
    DEFAULT_INSURANCE_CARRIES_FILTERS
  );
  const [search, setSearch] = useState<string>('');
  const [detailsId, setDetailsId] = useState<string>('');
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean | string>(
    false
  );
  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    loading: loadingInsuranceCarriers,
    data,
    refetch,
  } = useQuery(GET_INSURANCE_CARRIES, {
    variables: {
      sortOrder: filters.sortOrder,
      sortCol: 'name',
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
    },
    fetchPolicy: 'cache-and-network',
  });

  const { loading: loadingInsuranceCarrierDetails, data: insuranceDetails } =
    useQuery(INSURANCE_CARRIER_GET, {
      skip: !detailsId,
      variables: { uuid: detailsId },
    });

  const [insuranceCarrierDelete, { loading: loadingInsuranceCarrierDelete }] =
    useMutation(INSURANCE_CARRIER_DELETE);

  const insuranceCarriersCount: number = useMemo(
    () => data?.insuranceCarriers?.totalCount,
    [data?.insuranceCarriers?.totalCount]
  );
  const totalPages: number = useMemo(
    () => Math.ceil(data?.insuranceCarriers?.totalCount / ITEMS_PER_PAGE),
    [data?.insuranceCarriers?.totalCount]
  );
  const insuranceCarriersData = useMemo(
    () => data?.insuranceCarriers?.rows ?? [],
    [data]
  );
  const insuranceCarriersDetails = useMemo(
    () => insuranceDetails?.insuranceCarrierGet ?? {},
    [insuranceDetails]
  );
  const loading =
    (loadingInsuranceCarriers && !insuranceCarriersData?.length) ||
    loadingInsuranceCarrierDelete;

  const handleActionOnTableItem = (
    item: TDropdownItem,
    selectedItem: TInsuranceCarriers
  ): void => {
    if (item.type === INSURANCE_CARRIER_ACTIONS.EDIT) {
      router.push(item.href);
    } else if (item.type === INSURANCE_CARRIER_ACTIONS.DELETE) {
      setOpenWarningModal(item?.id);
    } else if (item.type === INSURANCE_CARRIER_ACTIONS.VIEW) {
      handleOnInsuranceCarriersClick(selectedItem);
    }
  };

  const handleRemoveInsuranceCarrier = async () => {
    try {
      await insuranceCarrierDelete({ variables: { uuid: openWarningModal } });
      await refetch();
    } catch (error) {
      captureSentryError(error, {
        entityId: openWarningModal,
      });
      console.log(error);
    } finally {
      setOpenWarningModal(false);
    }
  };

  const handleOnInsuranceCarriersClick = (item) => {
    setDetailsId(item?.id);
    setOpenModal(true);
  };

  const handleSearchInsuranceCarriesDebounce = useDebounce((value) => {
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
    handleSearchInsuranceCarriesDebounce(search);
  }, [search]);

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    localState: {
      filters,
      openModal,
      openWarningModal,
      currentPage,
      search,
    },
    localActions: {
      setFilters,
      setOpenModal,
      setOpenWarningModal,
      setCurrentPage,
      setSearch,
      setDetailsId,
    },
    formattedData: {
      insuranceCarriersCount,
      loading,
      totalPages,
      insuranceCarriersData,
      insuranceCarriersDetails,
      loadingInsuranceCarrierDetails,
    },
    handlers: {
      handleOnInsuranceCarriersClick,
      handleActionOnTableItem,
      handleRemoveInsuranceCarrier,
    },
    localErrorText,
  };
};

export { useInsuranceCarriers };
