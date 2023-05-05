import { formatPhoneNumber } from 'apps/squaredash-web/lib/formatPhoneNumber';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo, useState } from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Badge from '../../../../libs/web/components/Badge/Badge';
import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { STATUSES_LABELS } from '../../../../libs/web/constants/constants';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { USER_ROLES_LABELS } from './Members.constants';
import { getItemDropdowns, getMemberInitials } from './Members.helper';
import { Member } from './Members.types';

interface IProps {
  item: Member;
  size: number;
  isOwnUser: boolean;
  onClickRow?: (Member) => void;
  handleAction: (val: any, item: Member) => void;
}

const MembersTableItem = ({
  item,
  size,
  onClickRow,
  handleAction,
  isOwnUser,
}: IProps) => {
  const { t } = useTranslation('buttons');
  const dropdownItems = useMemo(
    () => getItemDropdowns({ item, t, isOwnUser, isDetails: false }),
    [item, t]
  );
  const [action, setAction] = useState(null);
  const memberInitials = getMemberInitials(item);

  useEffect(() => {
    if (action) {
      handleAction({ ...action, id: item?.id }, item);
    }
  }, [action]);

  return (
    <TableItem
      dropdownItems={dropdownItems}
      onClickItem={(value) => setAction(value)}
      columnsSize={size}
      onClick={() => onClickRow(item)}
    >
      <div className="flex col-span-2 items-center sm:items-start cursor-pointer">
        <div className="flex h-10 md:w-12 mr-4 bg-gray-100 rounded-full items-center justify-center">
          <Avatar
            size="medium"
            initials={memberInitials}
            image={item?.avatar}
          />
        </div>
        <div className="truncate">
          <Typography
            variant={ETextVariant.sm}
            medium
            className="mr-4 truncate"
          >
            {item.name}
          </Typography>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="items-center truncate"
          >
            {item.email || '-'}
          </Typography>
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="xl:hidden lg:hidden truncate"
          >
            {formatPhoneNumber(item.phone)}
          </Typography>
        </div>
      </div>
      <div className="flex items-center col-span-1 md:hidden sm:hidden truncate">
        <Typography variant={ETextVariant.sm} className="truncate">
          {formatPhoneNumber(item.phone)}
        </Typography>
      </div>
      <div className="flex items-center col-span-1 sm:hidden truncate">
        <Typography variant={ETextVariant.sm} className="truncate">
          {USER_ROLES_LABELS[item.role]}
        </Typography>
      </div>
      <div className="flex items-center col-span-1 sm:justify-between sm:w-full">
        <div className="hidden sm:flex truncate">
          <Typography
            variant={ETextVariant.sm}
            color={ETextColor.gray}
            className="mr-1 truncate"
          >
            {t('role')}:
          </Typography>
          <Typography variant={ETextVariant.sm} className="truncate">
            {USER_ROLES_LABELS[item.role]}
          </Typography>
        </div>
        <Badge status={STATUSES_LABELS[item.status]}>
          {STATUSES_LABELS[item.status]}
        </Badge>
      </div>
    </TableItem>
  );
};

export default MembersTableItem;
