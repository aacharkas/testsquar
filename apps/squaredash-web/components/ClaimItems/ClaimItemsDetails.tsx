import { useTranslation } from 'next-i18next';
import React from 'react';

import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import {TClaimItem} from './ClaimItems.types';
import {getSuggestionsItemDropdowns, getItemDropdowns} from './ClaimItems.helper';
import Dropdown from '../../../../libs/web/components/Dropdown/Dropdown';
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import DropdownItem from '../../../../libs/web/components/Dropdown/DropdownItem';

interface IProps {
  item: TClaimItem;
  globalTab?: boolean;
}

const ClaimItemsDetails = ({ item, globalTab }: IProps) => {
  const { t } = useTranslation(['claim_items']);
  const dropdownItems = globalTab ? getItemDropdowns(item?.id, t) : getSuggestionsItemDropdowns(item?.id, t);

  return (
    <div>
      <div className="flex col-span-3 items-center sm:items-start">
        <div className="items-center mt-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('description')}
          </Typography>
          <Typography variant={ETextVariant.sm}>{item?.description}</Typography>
        </div>
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
                <DropdownItem key={index} href={item.href}>
                  {item.title}
                </DropdownItem>
              );
            })}
          </Dropdown>
        </div>
      </div>
      <div className=" items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('source')}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {item?.source}
        </Typography>
      </div>
    </div>

  );
};

export default ClaimItemsDetails;
