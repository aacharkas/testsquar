import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import {useTranslation} from 'next-i18next';
import React, {useMemo} from 'react';

import Dropdown from '../../../../libs/web/components/Dropdown/Dropdown';
import DropdownItem from '../../../../libs/web/components/Dropdown/DropdownItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../libs/web/constants/enums';
import {formatPhoneNumber} from '../../lib/formatPhoneNumber';
import {getItemDropdowns} from './InsuranceCarriers.helper';
import type {TInsuranceCarriers} from './InsuranceCarriers.types';
import {useAbility} from '../../lib/ability';

interface IProps {
  item: TInsuranceCarriers;
}

const InsuranceCarriersDetails = ({item}: IProps) => {
  const ability = useAbility();
  const {t} = useTranslation(['buttons', 'insurance_carriers']);
  const dropdownItems = useMemo(
    () => getItemDropdowns(item?.id, t, true),
    [t, item?.id]
  );

  return (
    <div>
      <div className="flex col-span-3 items-center sm:items-start">
        <Typography variant={ETextVariant.xl_2} medium className="mr-4">
          {item.name}
        </Typography>
        {!!dropdownItems.filter(item => ability?.can(item?.permitAction, item?.permitUser)).length &&
          <div className="absolute right-0 md:right-8 sm:right-0 sm:right-0">
            <Dropdown
              mobileDisplayType="dropdown"
              button={
                <EllipsisVerticalIcon
                  className="h-6 w-6 text-gray-500"
                  aria-hidden="true"
                />
              }
            >
              {dropdownItems.map((item, index) => {
                return (
                  <DropdownItem
                    key={index}
                    href={item.href}
                    visible={
                      item?.permitUser && item?.permitAction
                        ? ability?.can(item?.permitAction, item?.permitUser)
                        : true
                    }
                  >
                    {item.title}
                  </DropdownItem>
                );
              })}
            </Dropdown>
          </div>}
      </div>
      <div className="items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('claims_email', {ns: 'insurance_carriers'})}
        </Typography>
        <Typography variant={ETextVariant.sm}>{item.email || '-'}</Typography>
      </div>
      <div className=" items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('phone_number', {ns: 'insurance_carriers'})}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {formatPhoneNumber(item.phone || '-')}
        </Typography>
      </div>
      <div className=" items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('fax_number', {ns: 'insurance_carriers'})}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {formatPhoneNumber(item.fax || '-')}
        </Typography>
      </div>
      <div className=" items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('address', {ns: 'insurance_carriers'})}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {item.address?.formattedAddress || '-'}
        </Typography>
      </div>
    </div>
  );
};

export default InsuranceCarriersDetails;
