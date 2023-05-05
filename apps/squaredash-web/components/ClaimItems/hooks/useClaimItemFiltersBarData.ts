import { useState } from 'react';

import {
  checkAllFilterValue,
  updateFilters,
} from '../../../../../libs/web/components/Select/MultiSelect';
import { SOURCES } from '../ClaimItems.contants';

const useClaimItemFilterBarData = ({ filters, setFilters }) => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [filtersIndicator, setFiltersIndicator] = useState<boolean>(false);
  const [selectedSource, setSelectedSource] = useState(
    filters.source || [SOURCES[0]]
  );
  const handleSourceFilters = (source) => {
    const updatedFilters = updateFilters(source, selectedSource);
    setSelectedSource(checkAllFilterValue(source, updatedFilters, SOURCES));
  };

  const applyFilters = () => {
    setFilters({
      ...filters,
      source: selectedSource,
    });
    setFiltersIndicator(true);
    setOpenFilters(false);
  };

  const clearFilters = () => {
    setSelectedSource([SOURCES[0]]);
    setFilters({
      ...filters,
      source: [SOURCES[0]],
    });
    setFiltersIndicator(false);
    setOpenFilters(false);
  };

  return {
    openFilters,
    filtersIndicator,
    selectedSource,
    setOpenFilters,
    handleSourceFilters,
    applyFilters,
    clearFilters,
  };
};

export { useClaimItemFilterBarData };
