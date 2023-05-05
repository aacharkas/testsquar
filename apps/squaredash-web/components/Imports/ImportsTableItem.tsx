import {STATUSES_LABELS, DEFAULT_STATUSES} from '../../../../libs/web/constants/constants';
import {useTranslation} from 'next-i18next';
import {useState, useMemo} from 'react';
import classNames from 'classnames';

import Divider from '../../../../libs/web/components/Divider/Divider';
import Badge from '../../../../libs/web/components/Badge/Badge';
import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {getActionBasedOnStatus, getItemDropdowns} from './Imports.helper';
import {TImport} from './Imports.types';
import {formatPrice} from '../../../../apps/squaredash-web/lib/formatPrice';
import {formatDate} from '../../../../apps/squaredash-web/lib/formatDate';

interface IProps {
  item: TImport;
  size: number;
}

const ImportsTableItem = ({
  item,
  size
}: IProps) => {
  const {t} = useTranslation('imports');
  const action = getActionBasedOnStatus(item, t);
  const [isCustomerNameActive, setIsCustomerNameActive] = useState(false);
  const [isPropertyAddressActive, setIsPropertyAddressActive] = useState(false);
  const [isInsuranceCarrierNameActive, setIsInsuranceCarrierNameActive] = useState(false);
  const setActiveCustomerNameState = (e) => {
    setIsCustomerNameActive(e?.target?.scrollWidth > e?.target?.offsetWidth);
  };
  const setActivePropertyAddressState = (e) => {
    setIsPropertyAddressActive(e?.target?.scrollWidth > e?.target?.offsetWidth);
  };
  const setActiveInsuranceCarrierNameState = (e) => {
    setIsInsuranceCarrierNameActive(e?.target?.scrollWidth > e?.target?.offsetWidth);
  };
  const dropdownItems = useMemo(() => getItemDropdowns(item, t), [item, t]);
  return (
    <TableItem
      dropdownItems={dropdownItems}
      buttonAction={item?.status !== DEFAULT_STATUSES.VERIFIED && action}
      columnsSize={size}
      columnsSizeTablet={3}
      itemToOpen={item}
    >
      <div className="flex col-span-1 items-center">
        <div>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block"
          >
            {t('date_of_loss')}
          </Typography>
          <Typography variant={ETextVariant.sm} medium
            className="mr-4 xl:text-sm lg:text-sm md:text-lg sm:text-lg">
            {formatDate(item.dateOfLoss)}
          </Typography>
        </div>
        <div className="hidden sm:block pl-5">
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
          >
            {t('claim_number')}
          </Typography>
          <Typography variant={ETextVariant.sm} medium className="mr-4 xl:text-sm lg:text-sm md:text-lg sm:text-lg">
            {item.claimNumber}
          </Typography>
        </div>
      </div>
      <div className="flex col-span-1 items-center md:col-span-2 sm:hidden">
        <div>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block"
          >
            {t('claim_number')}
          </Typography>
          <Typography variant={ETextVariant.sm} medium className="mr-4 xl:text-sm lg:text-sm md:text-lg sm:text-lg">
            {item.claimNumber}
          </Typography>
        </div>
      </div>
      <div className="text-sm items-center col-span-1 md:col-span-3">
        <div className="flex sm:pt-2">
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block pr-2"
          >
            {t('customer')}:
          </Typography>
          <div data-tooltip={`${item?.customerName} \n \n ${item?.propertyAddress}`} className={classNames('h-full w-[100px] flex items-center',{'hidden' : !isCustomerNameActive || !isPropertyAddressActive})}/>
          <div onMouseOver={(e) => setActiveCustomerNameState(e)} className="truncate">
            <Typography variant={ETextVariant.sm} medium className="truncate">
              {item?.customerName}
            </Typography>
          </div>
          
        </div>
        {item?.propertyAddress && (
          <>
            <div onMouseOver={(e) => setActivePropertyAddressState(e)} className='truncate'>
              <Typography variant={ETextVariant.sm} color={ETextColor.gray} className="truncate">
                {item?.propertyAddress}
              </Typography>
            </div>
          </>
         
          
        )}
        <div className="hidden md:flex mt-5">
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block pr-2"
          >
            {t('insurance_carrier')}:
          </Typography>
          <Typography variant={ETextVariant.sm} medium className="mr-4 truncate">
            {item.insuranceCarrierName}
          </Typography>      
        </div>
      </div>
      <div className="col-span-1 items-center truncate">
        <div className="flex md:hidden sm:mt-2">
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block pr-2"
          >
            {t('insurance_carrier')}:
          </Typography>
          <div data-tooltip={item.insuranceCarrierName} className={classNames('h-full w-[100px] flex items-center',{'hidden' : !isInsuranceCarrierNameActive})}/>
          <div onMouseOver={(e) => setActiveInsuranceCarrierNameState(e)} className='truncate'>
            <Typography variant={ETextVariant.sm} medium className="mr-4 mt-2 truncate">
              {item.insuranceCarrierName}
            </Typography>
          </div>
        </div>
      </div>
      <div className="flex col-span-1 items-center sm:w-full sm:pt-2">
        <div>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block"
          >
            {t('rcv')}
          </Typography>
          <Typography
            variant={ETextVariant.sm}
            medium
            className="mr-4 xl:text-sm lg:text-sm md:text-lg sm:text-lg md:text-indigo-800 sm:text-indigo-800"
          >
            {formatPrice(item.rcv, true)}
          </Typography>
        </div>
        <div className="hidden sm:flex pl-10">
          <Divider direction="vertical" className="hidden sm:block relative right-5 min-h-[48px]"/>
          <div className='flex justify-center flex-col'>
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
            >
              {t('deductible')}
            </Typography>
            <Typography variant={ETextVariant.sm} medium className="mr-4 xl:text-sm lg:text-sm md:text-lg sm:text-lg">
              {formatPrice(item.deductible, true)}
            </Typography>
          </div>
        </div>
        <div className="hidden sm:flex items-center sm:w-full sm:justify-end">
          <Badge status={DEFAULT_STATUSES[item.status]}>
            {STATUSES_LABELS[item.status]}
          </Badge>
        </div>
      </div>
      <div className="flex col-span-1 items-center md:col-span-2 sm:hidden">
        <Divider direction="vertical" className="hidden md:block relative right-5"/>
        <div>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="hidden md:block sm:block"
          >
            {t('deductible')}
          </Typography>
          <Typography variant={ETextVariant.sm} medium className="mr-4 xl:text-sm lg:text-sm md:text-lg sm:text-lg">
            {formatPrice(item.deductible, true)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center col-span-1 md:justify-end md:w-full sm:hidden">
        <Badge status={DEFAULT_STATUSES[item.status]}>
          {STATUSES_LABELS[item.status]}
        </Badge>
      </div>
    </TableItem>
  );
};

export default ImportsTableItem;
