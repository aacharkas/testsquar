import { useState } from 'react';

import {
  checkAllFilterValue,
  updateFilters,
} from '../../../../../libs/web/components/Select/MultiSelect';
import { CUSTOMERS, INSURANCE_CARRIERS } from '../Imports.constants';

const useImportsFiltersBarData = ({ filters, setFilters }) => {
  const [isCustomerFilterDetails, setIsCustomerFilterDetails] =
    useState<boolean>(false);
  const [openMultiSelectBar, setOpenMultiSelectBar] = useState<boolean>(false);
  const [selectedCustomers, setSelectedCustomers] = useState(
    (filters.customers?.length && filters.customers) || [CUSTOMERS[0]]
  );
  const [selectedCarriers, setSelectedCarriers] = useState(
    (filters.insuranceCarriers?.length && filters.insuranceCarriers) || [
      INSURANCE_CARRIERS[0],
    ]
  );
  const [selectedDates, setSelectedDates] = useState(filters.dates || null);
  const [selectedRCV, setSelectedRCV] = useState(filters.RCV || null);

  const handleCustomerFilters = (customer, data) => {
    const updatedFilters = updateFilters(customer, selectedCustomers);
    setSelectedCustomers(checkAllFilterValue(customer, updatedFilters, data));
  };

  const handleCarrierFilters = (carrier, data) => {
    const updatedFilters = updateFilters(carrier, selectedCarriers);
    setSelectedCarriers(checkAllFilterValue(carrier, updatedFilters, data));
  };

  const handleApplyFilters = () => {
    setFilters({
      ...filters,
      insuranceCarriers: selectedCarriers,
      customers: selectedCustomers,
      RCV: selectedRCV,
      dates: selectedDates,
    });
  };

  const handleClearFilters = () => {
    setSelectedCustomers([CUSTOMERS[0]]);
    setSelectedCarriers([INSURANCE_CARRIERS[0]]);
    setSelectedDates({
      dateFrom: null,
      dateTo: null,
    });
    setSelectedRCV({
      valueFrom: '',
      valueTo: '',
    });
    setFilters({
      ...filters,
      customer: [CUSTOMERS[0]],
      members: [INSURANCE_CARRIERS[0]],
      RCV: {
        valueFrom: '',
        valueTo: '',
      },
      dates: {
        dateFrom: null,
        dateTo: null,
      },
    });
  };

  return {
    localState: {
      selectedCustomers,
      selectedCarriers,
      selectedDates,
      selectedRCV,
      isCustomerFilterDetails,
      openMultiSelectBar,
    },
    localActions: {
      setSelectedDates,
      setSelectedRCV,
      setIsCustomerFilterDetails,
      setOpenMultiSelectBar,
    },
    handlers: {
      handleCustomerFilters,
      handleCarrierFilters,
      handleApplyFilters,
      handleClearFilters,
    },
  };
};

export { useImportsFiltersBarData };
