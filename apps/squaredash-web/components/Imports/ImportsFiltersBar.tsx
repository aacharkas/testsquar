import { BanknotesIcon } from '@heroicons/react/24/solid';
import RangeDatePicker from '../../../../libs/web/components/DatePicker/RangeDatePicker';
import InputRange from '../../../../libs/web/components/Input/InputRange';
import { useTranslation } from 'next-i18next';
import React, { Dispatch } from 'react';

import Button from '../../../../libs/web/components/Button/Button';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { TSelectElement } from './Imports.types';
import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { MIN_DATE_FROM } from './Imports.constants';

interface IDateRange {
  dateFrom: Date | string | null;
  dateTo: Date | string | null;
}

interface IValueRange {
  valueFrom: string | number;
  valueTo: string | number;
}

interface IProps {
  localState: {
    selectedCustomers: TSelectElement[];
    selectedCarriers: TSelectElement[];
    selectedDates: {
      dateFrom: Date;
      dateTo: Date;
    };
    selectedRCV: {
      valueFrom: string;
      valueTo: string;
    };
  };
  localActions: {
    setSelectedDates: Dispatch<IDateRange>;
    setSelectedRCV: Dispatch<IValueRange>;
    setIsCustomerFilterDetails: Dispatch<boolean>;
    setOpenMultiSelectBar: Dispatch<boolean>;
  };
  handlers: {
    handleCustomerFilters: (item: TSelectElement, data) => void;
    handleCarrierFilters: (item: TSelectElement, data) => void;
    handleApplyFilters: () => void;
    handleClearFilters: () => void;
  };
}

const ImportsFiltersBar = ({ localState, localActions, handlers }: IProps) => {
  const { t } = useTranslation('imports');
  const { t: tBtn } = useTranslation('buttons');

  return (
    <>
      <div className="border-b border-gray-100 py-5 px-6">
        <Typography variant={ETextVariant.lg} color={ETextColor.primary} medium>
          {t('filter')}
        </Typography>
      </div>
      <div className="my-2 mx-6">
        <div 
          className="flex justify-between pt-5 cursor-pointer" 
          onClick={() => {
            localActions.setIsCustomerFilterDetails(true);
            localActions.setOpenMultiSelectBar(true);
          }}
        >
          <Typography variant={ETextVariant.base} medium>
            {t('customers')}
          </Typography>
          <ChevronRightIcon className="h-6 w-6 mr-2"/>
        </div>
        <div 
          className="flex justify-between py-10 cursor-pointer" 
          onClick={() => {
            localActions.setIsCustomerFilterDetails(false);
            localActions.setOpenMultiSelectBar(true);
          }}
        >
          <Typography variant={ETextVariant.base} medium>
            {t('insurance_carriers')}
          </Typography>
          <ChevronRightIcon className="h-6 w-6 mr-2"/>
        </div>
        <div className="pt-2 w-4/5">
          <RangeDatePicker 
            value={localState.selectedDates}
            onChangeDate={(value) => localActions.setSelectedDates(value)}
            minDate={new Date(MIN_DATE_FROM)}
            maxDate={new Date()}
          />
        </div>
        <div className="pt-6 w-4/5">
          <InputRange
            icon={
              <BanknotesIcon 
                className="h-5 w-5 text-gray-400"
                aria-hidden="true" 
              />
            }
            placeholder={{
              from: t('rcv_from'),
              to: t('rcv_to'),
            }}
            value={localState.selectedRCV}
            onChangeText={(value) => localActions.setSelectedRCV(value)}
          />
        </div>
        <div className="pt-5">
          <Button
            size="big"
            className="w-full mb-3"
            onClick={handlers.handleApplyFilters}
          >
            {tBtn('apply')}
          </Button>
          <Button
            size="big"
            theme="light"
            className="w-full"
            onClick={handlers.handleClearFilters}
          >
            {tBtn('clear_filters')}
          </Button>
        </div>
      </div>
    </>
  );
};

export default ImportsFiltersBar;
