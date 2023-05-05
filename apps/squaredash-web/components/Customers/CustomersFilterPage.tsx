import {useTranslation} from 'next-i18next';

import Checkbox from '../../../../libs/web/components/Checkbox/Checkbox';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {ArrowLeftIcon, MagnifyingGlassIcon} from '@heroicons/react/24/outline';
import {Combobox} from '@headlessui/react';
import classNames from 'classnames';
import Spinner from '../../../../libs/web/components/Spinner/Spinner';
import {IItem} from '../../../../libs/web/components/Select/AsyncSelect';
import {useCustomersFilterPageData} from './hooks/useCustomersFilterPageData';

const CustomerFilterPage = ({localState, handlers, localActions, formattedData}) => {
  const {t} = useTranslation('customers');
  const {loadRequest, convertedData, asyncSelectSearch} = useCustomersFilterPageData({localState, formattedData});

  return (
    <>
      <div className="border-b border-gray-100 py-5 px-6 flex flex-start">
        <ArrowLeftIcon className="h-6 w-6 mr-2" onClick={() => localActions.setOpenCustomersFilterPage(false)}/>
        <Typography variant={ETextVariant.lg} color={ETextColor.primary} medium className='pl-4'>
          {localState.isCustomerFilterDetails ? t('customers') : t('responsible_member')}
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
                      () => handlers.handleMemberFilters(item, convertedData)
                  }
                  checked={
                    localState.isCustomerFilterDetails ?
                      localActions.selectedCustomers.some(e => e.id === item.id) :
                      localActions.selectedMembers.some(e => e.id === item.id)
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
export default CustomerFilterPage;
