import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';

import { convertAsyncData } from '../../../../../libs/web/components/Select/AsyncMultiSelect.helpers';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { GET_CUSTOMERS } from '../../Customers/Customers.api';
import { GET_INSURANCE_CARRIES } from '../../InsuranceCarriers/InsureanceCarriers.api';
import {
  ALL_CUSTOMERS,
  ALL_INSURANCE_CARRIERS,
  NUMBER_REQUEST_ELEMENTS,
  NUMBER_SHOW_TO_USER,
  SEARCH_SIMBOLS,
} from '../Imports.constants';

const useMultiSelectBarData = ({ localState, t }) => {
  const defaultValueNeeded = localState.isCustomerFilterDetails
    ? t(ALL_CUSTOMERS)
    : t(ALL_INSURANCE_CARRIERS);
  const responsePathToArray = localState.isCustomerFilterDetails
    ? 'customers'
    : 'insuranceCarriers';
  const [search, setSearch] = useState<string>('');
  const [skipElements, setSkipElements] = useState<number>(0);
  const notSkipRequest = useMemo(
    () => !search || search.length > SEARCH_SIMBOLS,
    [search]
  );
  const queryStructure = localState.isCustomerFilterDetails
    ? GET_CUSTOMERS
    : GET_INSURANCE_CARRIES;
  const {
    loading: loadRequest,
    data,
    previousData,
  } = useQuery(queryStructure, {
    skip: !notSkipRequest,
    variables: {
      search: search,
      take: NUMBER_REQUEST_ELEMENTS,
      skip: skipElements,
    },
  });

  const responseIdName = 'id';
  const responseNameName = localState.isCustomerFilterDetails
    ? 'displayName'
    : 'name';

  const asyncSelectSearch = useDebounce((value) => {
    setSkipElements(0);
    setSearch(value);
  });

  const convertedData = useMemo(
    () =>
      convertAsyncData({
        responsePathToArray,
        previousData,
        skipElements,
        responseIdName,
        responseNameName,
        numberRequestElements: NUMBER_REQUEST_ELEMENTS,
        loadRequest,
        setSkipElements,
        numberShowToUser: NUMBER_SHOW_TO_USER,
        defaultValueNeeded,
        data,
        convertHelpFunction: false,
        removeIds: false,
        query: search,
      }),
    [data]
  );

  return {
    loadRequest,
    asyncSelectSearch,
    convertedData,
  };
};

export { useMultiSelectBarData };
