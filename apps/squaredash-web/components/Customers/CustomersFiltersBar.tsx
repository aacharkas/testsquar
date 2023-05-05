import {useTranslation} from 'next-i18next';
import React from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {TYPES} from './Customers.constants';
import {Can} from '../../lib/ability';
import {TSelectElement} from './Customers.types';
import {ChevronRightIcon} from '@heroicons/react/24/outline';
import {PERMISSION_ACTIONS, PERMISSIONS} from '../../constants/permissions';
import Checkbox from '../../../../libs/web/components/Checkbox/Checkbox';

interface IProps {
  localActions: {
    selectedCustomers: TSelectElement[];
    selectedMembers: TSelectElement[];
    selectedTypes: TSelectElement;
    setCustomerFilterDetails: (value) => void;
    setOpenCustomersFilterPage: (value) => void;
  };
  handlers: {
    handleTypeFilters: (item: TSelectElement) => void;
    handleApplyFilters: () => void;
    handleClearFilters: () => void;
    handleOpenCustomerFilterPage: () => void;
  };
  checked: TSelectElement;
}

const CustomerFilterBar = ({localActions, handlers, checked}: IProps) => {
  const {t} = useTranslation('customers');
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
            {t('type')}
          </Typography>
          {TYPES.map((item) => {
            return (
              <Checkbox
                key={item.id}
                label={item.name}
                onChange={() => handlers.handleTypeFilters(item)}
                checked={checked?.type === item?.type}
                className="my-5"
              />
            );
          })}
        </div>
        <div
          className="flex justify-between pt-10"
          onClick={handlers.handleOpenCustomerFilterPage}
        >
          <Typography variant={ETextVariant.base} medium>
            {t('customers')}
          </Typography>
          <ChevronRightIcon className="h-6 w-6 mr-2"/>
        </div>
        <Can I={PERMISSION_ACTIONS.GET} a={PERMISSIONS.USER_LIST}>
          <div
            className="flex justify-between pt-10 pb-8"
            onClick={() => {
              localActions.setCustomerFilterDetails(false);
              localActions.setOpenCustomersFilterPage(true);
            }}
          >
            <Typography variant={ETextVariant.base} medium>
              {t('responsible_member')}
            </Typography>
            <ChevronRightIcon className="h-6 w-6 mr-2"/>
          </div>
        </Can>
        <div className="pt-4">
          <Button
            size="big"
            className="w-full mb-3"
            onClick={handlers.handleApplyFilters}
          >
            {t('apply')}
          </Button>
          <Button
            size="big"
            theme="light"
            className="w-full"
            onClick={handlers.handleClearFilters}
          >
            {t('clear_filters')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default CustomerFilterBar;
