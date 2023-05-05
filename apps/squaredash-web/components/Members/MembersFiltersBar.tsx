import { useTranslation } from 'next-i18next';
import React from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import Checkbox from '../../../../libs/web/components/Checkbox/Checkbox';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';

interface IProps {
  rolesOptions: { id: number; name: string }[];
  statusesOptions: { id: number; name: string }[];
  selectedRoles: { id: number; name: string }[];
  selectedStatuses: { id: number; name: string }[];
  handleRoleFilters: (role) => void;
  handleStatusFilters: (status) => void;
  applyFilters: () => void;
  clearFilters: () => void;
}

const MembersFilterBar = ({
  rolesOptions,
  statusesOptions,
  selectedRoles,
  selectedStatuses,
  handleRoleFilters,
  handleStatusFilters,
  applyFilters,
  clearFilters,
}: IProps) => {
  const { t } = useTranslation('members');
  return (
    <>
      <div className="border-b border-gray-100 py-5 px-6">
        <Typography variant={ETextVariant.lg} color={ETextColor.primary} medium>
          {t('filter')}
        </Typography>
      </div>
      <div className="my-2 mx-6">
        <div>
          <Typography variant={ETextVariant.base} medium>
            {t('role')}
          </Typography>
          {rolesOptions.map((item) => {
            return (
              <Checkbox
                key={item.id}
                label={item.name}
                onChange={() => handleRoleFilters(item)}
                checked={selectedRoles.includes(item)}
                className="my-5"
              />
            );
          })}
        </div>
        <div className="pt-2">
          <Typography variant={ETextVariant.base} medium>
            {t('status')}
          </Typography>
          {statusesOptions.map((item) => {
            return (
              <Checkbox
                key={item.id}
                label={item.name}
                onChange={() => handleStatusFilters(item)}
                checked={selectedStatuses.includes(item)}
                className="my-5"
              />
            );
          })}
        </div>
        <div className="pt-4">
          <Button size="big" className="w-full mb-3" onClick={applyFilters}>
            {t('apply')}
          </Button>
          <Button
            size="big"
            theme="light"
            className="w-full"
            onClick={clearFilters}
          >
            {t('clear_filters')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default MembersFilterBar;
