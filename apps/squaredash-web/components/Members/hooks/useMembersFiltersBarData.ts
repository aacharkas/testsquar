import { useState } from 'react';

import {
  checkAllFilterValue,
  handleMultiSelectChanges,
  updateFilters,
} from '../../../../../libs/web/components/Select/MultiSelect';
import { ROLES, STATUSES } from '../Members.constants';

const useMembersFilterBarData = ({
  rolesOptions,
  statusesOptions,
  filters,
  setFilters,
}) => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [filtersIndicator, setFiltersIndicator] = useState<boolean>(false);
  const [selectedRoles, setSelectedRoles] = useState(
    (filters.resRoles.length && filters.resRoles) || [rolesOptions[0]]
  );
  const [selectedStatuses, setSelectedStatuses] = useState(
    (filters.resTechStatuses.length && filters.resTechStatuses) || [
      statusesOptions[0],
    ]
  );

  const handleRoleFilters = (role) => {
    const updatedFilters = updateFilters(role, selectedRoles);
    setSelectedRoles(checkAllFilterValue(role, updatedFilters, ROLES));
  };

  const handleStatusFilters = (status) => {
    const updatedFilters = updateFilters(status, selectedStatuses);
    setSelectedStatuses(checkAllFilterValue(status, updatedFilters, STATUSES));
  };

  const applyFilters = () => {
    setFilters({
      ...filters,
      resRoles: selectedRoles,
      resTechStatuses: selectedStatuses,
    });
    setFiltersIndicator(true);
    setOpenFilters(false);
  };

  const clearFilters = () => {
    setSelectedRoles([rolesOptions[0]]);
    setSelectedStatuses([statusesOptions[0]]);
    setFilters({
      ...filters,
      resRoles: [rolesOptions[0]],
      resTechStatuses: [statusesOptions[0]],
    });
    setFiltersIndicator(false);
    setOpenFilters(false);
  };

  return {
    openFilters,
    filtersIndicator,
    selectedRoles,
    selectedStatuses,
    handleMultiSelectChanges,
    setOpenFilters,
    handleRoleFilters,
    handleStatusFilters,
    applyFilters,
    clearFilters,
  };
};

export { useMembersFilterBarData };
