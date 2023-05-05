import { useQuery } from '@apollo/client';
import { useLazyQuery, useMutation } from '@apollo/client';
import { ChangeEvent, useEffect, useMemo, useState } from 'react';

import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { UPLOAD_FILE } from '../../ImageInput/ImageInput.api';
import { UPLOAD_INSTANCE } from '../../ImageInput/ImageInput.constants';
import { uploadFileFunction } from '../../ImageInput/hooks/useFileUploadData.helper';
import { MAX_IMAGE_SIZE } from '../../ImageInput/hooks/useImageInputData';
import { GET_IMPORTS, GET_UPLOAD_LINK, UPLOAD_NEW_SCOPE } from '../Imports.api';
import {
  DEFAULT_IMPORTS_FILTERS,
  ITEMS_PER_PAGE,
  SUPPORTED_TYPES,
} from '../Imports.constants';
import { TFilters } from '../Imports.types';
import {
  fillCustomers,
  fillDates,
  fillInsuranceCarriers,
} from './useImportsData.helper';

const useImportsData = () => {
  const [filters, setFilters] = useState<TFilters>(DEFAULT_IMPORTS_FILTERS);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [uploadNewScope, { loading: loadingUpload }] =
    useMutation(UPLOAD_NEW_SCOPE);
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [getLink] = useLazyQuery(GET_UPLOAD_LINK);
  const [error, setError] = useState<string>('');
  const [currentPercent, setCurrentPercent] = useState<number>(0);
  const [progressLoading, setProgressLoading] = useState<boolean>(false);
  const [channelName, setChannelName] = useState<string>('');

  const ws = new WebSocket(process.env.NX_API_GW_DOMAIN_NAME);
  ws.onclose = () => {
    setCurrentPercent(0);
    setChannelName('');
    setProgressLoading(false);
  };

  const { dateOfLossFrom, dateOfLossTo } = useMemo(
    () => fillDates(filters.dates),
    [filters.dates]
  );

  const customers = useMemo(
    () => fillCustomers(filters.customers),
    [filters.customers]
  );

  const insuranceCarriers = useMemo(
    () => fillInsuranceCarriers(filters.insuranceCarriers),
    [filters.insuranceCarriers]
  );

  const {
    loading: loadingImports,
    data,
    refetch,
  } = useQuery(GET_IMPORTS, {
    variables: {
      take: ITEMS_PER_PAGE,
      skip: filters.skip,
      search: filters.search,
      customerIds: customers.join(','),
      insuranceCarrierIds: insuranceCarriers.join(','),
      dateOfLossFrom,
      dateOfLossTo,
      rcvFrom: filters?.RCV.valueFrom || undefined,
      rcvTo: filters?.RCV.valueTo || undefined,
    },
    fetchPolicy: 'cache-and-network',
  });

  const importsCount: number = useMemo(
    () => data?.imports?.totalCount,
    [data?.imports?.totalCount]
  );
  const totalPages: number = useMemo(
    () => Math.ceil(data?.imports?.totalCount / ITEMS_PER_PAGE),
    [data?.imports?.totalCount]
  );

  const importsData = useMemo(() => data?.imports?.rows ?? [], [data]);

  const loading = loadingImports && !importsData?.length;

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
        if (data?.data?.progress) {
          setCurrentPercent(data.data?.progress);
        }
      };
    }
  }, [channelName]);

  const handleFile = async (e: ChangeEvent<HTMLInputElement>) => {
    setProgressLoading(true);
    await uploadFileFunction({
      e,
      SUPPORTED_TYPES,
      getLink,
      uploadFile,
      instance: UPLOAD_INSTANCE.INSURANCE_SCOPE,
      MAX_FILE_SIZE: MAX_IMAGE_SIZE,
      setError,
      uploadNewScope,
      setChannelName,
    });
    await refetch();
    ws.close();
  };

  return {
    localState: {
      search,
      filters,
      loadingUpload,
      currentPage,
      error,
    },
    localActions: {
      setSearch,
      setFilters,
      setCurrentPage,
      setError,
    },
    formattedData: {
      importsData,
      importsCount,
      totalPages,
      loading,
      currentPercent,
      progressLoading,
    },
    handlers: {
      handleFile,
    },
  };
};

export { useImportsData };
