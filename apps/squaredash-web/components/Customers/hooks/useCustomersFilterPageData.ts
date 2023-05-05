import { useQuery } from '@apollo/client';
import { useMemo, useState } from 'react';

import { convertAsyncData } from '../../../../../libs/web/components/Select/AsyncMultiSelect.helpers';
import { useDebounce } from '../../../../../libs/web/hooks/useDebounce';
import { GET_MEMBERS } from '../../Members/Members.api';
import { GET_CUSTOMERS } from '../Customers.api';
import {
  CUSTOMERS_LABELS,
  RESP_MEMBERS_LABELS,
  SEARCH_SIMBOLS,
  numberRequestElements,
  numberShowToUser,
} from '../Customers.constants';

const useCustomersFilterPageData = ({ localState, formattedData }) => {
  const defaultValueNeeded = localState.isCustomerFilterDetails
    ? CUSTOMERS_LABELS.ALL_PARENTS_CUSTOMERS
    : RESP_MEMBERS_LABELS.ALL_MEMBERS;
  const responsePathToArray = localState.isCustomerFilterDetails
    ? 'customers'
    : 'members';

  const [query, setQuery] = useState<string>('');
  const [skipElements, setSkipElements] = useState<number>(0);
  const notSkipRequest = useMemo(
    () => !query || query.length > SEARCH_SIMBOLS,
    [query]
  );
  const queryStructure = localState.isCustomerFilterDetails
    ? GET_CUSTOMERS
    : GET_MEMBERS;

  const {
    loading: loadRequest,
    data,
    previousData,
  } = useQuery(queryStructure, {
    skip: !notSkipRequest,
    variables: {
      companyId: formattedData.companyId,
      search: query,
      take: numberRequestElements,
      skip: skipElements,
    },
  });
  const responseIdName = 'id';
  const responseNameName = localState.isCustomerFilterDetails
    ? 'displayName'
    : 'name';

  const asyncSelectSearch = useDebounce((value) => {
    setSkipElements(0);
    setQuery(value);
  });

  const convertedData = useMemo(
    () =>
      convertAsyncData({
        responsePathToArray,
        previousData,
        skipElements,
        responseIdName,
        responseNameName,
        numberRequestElements,
        loadRequest,
        setSkipElements,
        numberShowToUser,
        defaultValueNeeded,
        data,
        convertHelpFunction: false,
        removeIds: false,
        query,
      }),
    [data]
  );

  return {
    loadRequest,
    convertedData,
    asyncSelectSearch,
  };
};

export { useCustomersFilterPageData };
