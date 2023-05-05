import { useTranslation } from 'next-i18next';
import React from 'react';

import Checkbox from '../../../../libs/web/components/Checkbox/Checkbox';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { Combobox } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import classNames from 'classnames';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import { IItem } from '../../../../libs/web/components/Select/AsyncSelect';
import { useMultiSelectBarData } from './hooks/useMultiSelectBarData';

const MultiSelectFilterBar = ({ localState, handlers, localActions }) => {
  const {t} = useTranslation('imports');
  const {loadRequest, convertedData, asyncSelectSearch} = useMultiSelectBarData({localState, t});

  return (
    <>
      <div className="border-b border-gray-100 py-5 px-6 flex flex-start">
        <ArrowLeftIcon className="h-6 w-6 mr-2" onClick={() => localActions.setOpenMultiSelectBar(false)}/>
        <Typography variant={ETextVariant.lg} color={ETextColor.primary} medium className='pl-4'>
          {localState.isCustomerFilterDetails ? t('customers') : t('insurance_carriers')}
        </Typography>
      </div>
      <Combobox>
        <div className={classNames('relative xmt-1 rounded-md shadow-sm')}>
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 pt-8">
            <MagnifyingGlassIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
          <Combobox.Input
            onChange={(event) => asyncSelectSearch(event.target.value)}
            displayValue={(values: IItem[]) => values?.map((item: IItem) => item?.name).join(', ')}
            autoComplete={'off'}
            placeholder={t('search')}
            className={classNames(
              'w-11/12 mx-3.5 mt-8 pl-8 rounded-md text-sm text-gray-900 flex items-center',
            )}
          />
        </div>
        <div className="my-2 mx-6">
          <div>
            {convertedData.map((item) => {
              return (
                <Checkbox
                  key={item.id}
                  label={item.name}
                  onChange={
                    localState.isCustomerFilterDetails ?
                      () => handlers.handleCustomerFilters(item, convertedData) :
                      () => handlers.handleCarrierFilters(item, convertedData)
                  }
                  checked={
                    localState.isCustomerFilterDetails ?
                      localState.selectedCustomers.some(e => e.id === item.id) :
                      localState.selectedCarriers.some(e => e.id === item.id)
                  }
                  className="my-5"
                />
              );
            })}
          </div>
        </div>
      </Combobox>
      {loadRequest && <Spinner contentSize/>}
    </>
  );
};

export default MultiSelectFilterBar;