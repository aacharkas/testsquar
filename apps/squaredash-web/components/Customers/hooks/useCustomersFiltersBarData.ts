import { useMemo, useState } from 'react';

import {
  checkAllFilterValue,
  handleMultiSelectChanges,
  updateFilters,
} from '../../../../../libs/web/components/Select/MultiSelect';
import { CUSTOMERS, RESP_MEMBERS, TYPES } from '../Customers.constants';
import { TSelectElement } from '../Customers.types';

const useCustomersFiltersBarData = ({ filters, setFilters }) => {
  const [selectedCustomers, setSelectedCustomers] = useState(
    (filters.parents?.length && filters.parents) || [CUSTOMERS[0]]
  );
  const [selectedMembers, setSelectedMembers] = useState(
    (filters.responsibleMembers?.length && filters.responsibleMembers) || [
      RESP_MEMBERS[0],
    ]
  );
  const [selectedTypes, setSelectedTypes] = useState<TSelectElement>(TYPES[0]);
  const [openCustomersFilterPage, setOpenCustomersFilterPage] = useState(false);
  const [isCustomerFilterDetails, setCustomerFilterDetails] = useState(true);

  const handleCustomerFilters = (customer, data) => {
    const updatedFilters = updateFilters(customer, selectedCustomers);
    setSelectedCustomers(checkAllFilterValue(customer, updatedFilters, data));
  };

  const handleMemberFilters = (member, data) => {
    const updatedFilters = updateFilters(member, selectedMembers);
    setSelectedMembers(checkAllFilterValue(member, updatedFilters, data));
  };

  const handleTypeFilters = (type) => {
    setSelectedTypes(type);
  };
  const handleOpenCustomerFilterPage = () => {
    setFilters({ ...filters, resTypes: 'ALL' });
    setCustomerFilterDetails(true);
    setOpenCustomersFilterPage(true);
  };

  const handleApplyFilters = () => {
    setFilters({
      ...filters,
      parents: selectedCustomers,
      responsibleMembers: selectedMembers,
      resTypes: selectedTypes.type,
    });
  };

  const handleClearFilters = () => {
    setSelectedCustomers([CUSTOMERS[0]]);
    setSelectedMembers([RESP_MEMBERS[0]]);
    setSelectedTypes(TYPES[0]);
    setFilters({
      ...filters,
      parents: [CUSTOMERS[0]],
      responsibleMembers: [RESP_MEMBERS[0]],
      resTypes: TYPES[0].type,
    });
  };

  return {
    localState: {
      openCustomersFilterPage,
      isCustomerFilterDetails,
    },
    localActions: {
      selectedCustomers,
      selectedMembers,
      selectedTypes,
      setOpenCustomersFilterPage,
      setCustomerFilterDetails,
    },
    handlers: {
      handleCustomerFilters,
      handleMemberFilters,
      handleTypeFilters,
      handleApplyFilters,
      handleClearFilters,
      handleMultiSelectChanges,
      handleOpenCustomerFilterPage,
    },
  };
};

export { useCustomersFiltersBarData };
