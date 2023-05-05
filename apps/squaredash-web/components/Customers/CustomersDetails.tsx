import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { formatPhoneNumber } from '../../lib/formatPhoneNumber';
import { TFunction, useTranslation } from 'next-i18next';
import React, { useMemo, useState } from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Badge from '../../../../libs/web/components/Badge/Badge';
import Dropdown from '../../../../libs/web/components/Dropdown/Dropdown';
import DropdownItem from '../../../../libs/web/components/Dropdown/DropdownItem';
import { Tabs } from '../../../../libs/web/components/Tabs/Tabs';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getItemDropdowns } from './Customers.helper';
import type { TCustomer } from './Customers.types';

interface IProps {
  item: TCustomer;
  notAbleToRemoveMember: boolean;
}

const GeneralInfo = ({
  t,
  item,
}: {
  t: TFunction;
  item: TCustomer;
}): JSX.Element => (
  <div>
    <div>
      <div className="items-center mt-4">
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="mb-1"
        >
          {t('customer_type', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {item?.type?.toLowerCase()}
        </Typography>
      </div>
      <div className=" items-center mt-4">
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="mb-1"
        >
          {t('contact_name', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>{item?.displayName}</Typography>
      </div>
      <div className=" items-center mt-4">
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="mb-1"
        >
          {t('contact_email', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>{item?.email}</Typography>
      </div>
      <div className="items-center mt-4">
        <Typography
          variant={ETextVariant.sm}
          color={ETextColor.gray}
          className="mb-1"
        >
          {t('phone_number', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {formatPhoneNumber(item?.phone)}
        </Typography>
      </div>
    </div>
    {/*<div className="border-b border-t border-gray-900/20 my-3 py-4 flex gap-3 items-center">
      <div className="rounded-full w-10 h-10 bg-gray-100 flex items-center justify-center">
        <LinkIcon className="h-6 w-6 text-gray-500" />
      </div>
      <Typography variant={ETextVariant.sm}>
        {t('charter_communications')}
      </Typography>
    </div>*/}
    <div className="pt-2">
      <Typography variant={ETextVariant.sm}>
        {t('responsible_members')}
      </Typography>
      {item?.responsibleMembers?.map((member) => (
        <div key={member?.id} className="my-3 flex gap-3 items-center">
          <Avatar size="medium" image={member?.avatar} />
          <Typography variant={ETextVariant.sm}>{member?.name}</Typography>
        </div>
      ))}
    </div>
  </div>
);

const AddressInfo = ({
  t,
  item,
}: {
  t: TFunction;
  item: TCustomer;
}): JSX.Element => (
  <div>
    <div className="py-5 border-b border-gray-900/20">
      <Typography variant={ETextVariant.lg} medium>
        {t('billing_information')}
      </Typography>
      <div className="items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('name', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {item?.billingName || '-'}
        </Typography>
      </div>
      <div className="items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('address', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {item?.billingAddress?.formattedAddress || '-'}
        </Typography>
      </div>
    </div>
    <div className="pt-5">
      <Typography variant={ETextVariant.lg} medium>
        {t('shipping_information')}
      </Typography>
      <div className=" items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('name', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {item?.shippingName || '-'}
        </Typography>
      </div>
      <div className="items-center mt-4">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {t('address', { ns: 'customers' })}
        </Typography>
        <Typography variant={ETextVariant.sm}>
          {item?.shippingAddress?.formattedAddress || '-'}
        </Typography>
      </div>
    </div>
  </div>
);

const NotesInfo = ({
  t,
  item,
}: {
  t: TFunction;
  item: TCustomer;
}): JSX.Element => (
  <div className="py-5">
    <Typography variant={ETextVariant.sm}>
      {item?.notes || t('no_notes')}
    </Typography>
  </div>
);

const CustomersDetails = ({ item, notAbleToRemoveMember }: IProps) => {
  const { t } = useTranslation(['customers']);

  const detailsTabs = useMemo(
    () => [
      {
        id: 'general',
        name: t('general'),
        children: <GeneralInfo t={t} item={item} />,
      },
      {
        id: 'addresses',
        name: t('addresses'),
        children: <AddressInfo t={t} item={item} />,
      },
      {
        id: 'notes',
        name: t('notes'),
        children: <NotesInfo t={t} item={item} />,
      },
    ],
    [item]
  );

  const [currentTab, setCurrentTab] = useState<string>(detailsTabs[0]?.id);
  const dropdownItems = useMemo(
    () => getItemDropdowns({id: item?.id, t, short: true, notAbleToRemoveMember}),
    [item?.id, t, notAbleToRemoveMember]
  );

  return (
    <div>
      <div className="flex col-span-3 items-start sm:items-start">
        <div className="mb-2">
          <Typography variant={ETextVariant.xl_2} medium className="mr-4">
            {item.displayName}
          </Typography>
          {item.parentId && <Badge color="blue">{t('sub_customer')}</Badge>}
        </div>
        <div className="absolute right-3 md:right-8 sm:right-4 sm:right-0">
          <Dropdown
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
      <Tabs
        disableSmall
        currentTab={currentTab}
        changeTab={setCurrentTab}
        tabs={detailsTabs}
      />
    </div>
  );
};

export default CustomersDetails;
