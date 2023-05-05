import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Badge from '../../../../libs/web/components/Badge/Badge';
import Dropdown from '../../../../libs/web/components/Dropdown/Dropdown';
import DropdownItem from '../../../../libs/web/components/Dropdown/DropdownItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { STATUSES_LABELS } from '../../../../libs/web/constants/constants';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { useAbility } from '../../lib/ability';
import { formatPhoneNumber } from '../../lib/formatPhoneNumber';
import { USER_ROLES_LABELS } from './Members.constants';
import {
  dateFormat,
  getItemDropdowns,
  getMemberInitials,
} from './Members.helper';
import { Member } from './Members.types';

interface IProps {
  item: Member;
  isOwnUser: boolean;
  handleAction: (val: any, item: Member) => void;
}

const MemberDetails = ({ item, handleAction, isOwnUser }: IProps) => {
  const ability = useAbility();
  const { t } = useTranslation(['buttons', 'members']);
  const dropdownItems = useMemo(
    () => getItemDropdowns({ item, t, isOwnUser, isDetails: true }),
    [item, t]
  );
  const memberInitials = getMemberInitials(item);
  const [action, setAction] = useState(null);

  useEffect(() => {
    if (action) {
      handleAction({ ...action, id: item?.id }, item);
    }
  }, [action]);

  return (
    <div>
      <div className="flex h-32 mr-4 items-center justify-center">
        <Avatar size="huge" initials={memberInitials} image={item?.avatar} />
      </div>
      <div className="flex col-span-3 items-center sm:items-start mt-5">
        <Typography variant={ETextVariant.xl_2} medium className="mr-4 truncate">
          {item.name}
        </Typography>
        <Badge status={STATUSES_LABELS[item.status]}>
          {STATUSES_LABELS[item.status]}
        </Badge>
        <div className="absolute right-0 md:right-8 sm:right-0 sm:right-0">
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
                <DropdownItem
                  key={index}
                  href={item.href}
                  onClick={() => setAction(item)}
                  visible={
                    item?.permitUser && item?.permitAction
                      ? ability?.can(item?.permitAction, item?.permitUser)
                      : true
                  }
                >
                  <Typography
                    variant={ETextVariant.sm}
                    color={ETextColor.gray}
                    medium
                  >
                    {item.title}
                  </Typography>
                </DropdownItem>
              );
            })}
          </Dropdown>
        </div>
      </div>
      <div className="flex items-center col-span-1">
        <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
          {USER_ROLES_LABELS[item.role]}
        </Typography>
      </div>
      <div className="border-b border-gray-100 py-4">
        <div className="items-center mt-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('contact_email', { ns: 'members' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>{item.email}</Typography>
        </div>
        <div className="items-center mt-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('phone_number', { ns: 'members' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>
            {formatPhoneNumber(item.phone)}
          </Typography>
        </div>
        <div className="items-center mt-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('address', { ns: 'members' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>
            {item.address?.formattedAddress
              ? item.address?.formattedAddress
              : '-'}
          </Typography>
        </div>
      </div>
      <div className="pt-4">
        <div className="items-center mb-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('date_of_birth', { ns: 'members' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>
            {dateFormat(item.birthDate)}
          </Typography>
        </div>
        <div className="items-center mb-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('t_shirt_size', { ns: 'members' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>
            {item.tShirtSize ? item.tShirtSize : '-'}
          </Typography>
        </div>
        <div className="items-center">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('timezone', { ns: 'members' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>{item.timezone}</Typography>
        </div>
      </div>
    </div>
  );
};

export default MemberDetails;
