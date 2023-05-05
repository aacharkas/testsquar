import { useTranslation } from 'next-i18next';
import React, {useEffect, useMemo, useState} from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Badge from '../../../../libs/web/components/Badge/Badge';
import Modal from '../../../../libs/web/components/Modal/Modal';
import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { STATUSES_LABELS } from '../../../../libs/web/constants/constants';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getAdminInitials, getItemDropdowns } from './Admins.helper';
import { Admin } from './Admins.types';

interface IProps {
  item: Admin;
  size: number;
  currentUserId?: string;
  onClickRow?: (Admin) => void;
  handleAction: (val: any, item: Admin) => void;
}

const AdminsTableItem = ({ item, size, onClickRow, handleAction, currentUserId }: IProps) => {
  const { t } = useTranslation('buttons');
  const isCurrentUser = useMemo(
    () => currentUserId == item?.id,
    [currentUserId, item?.id]
  );

  const dropdownItems = useMemo(
    () => getItemDropdowns({item, t, isDetails: false, isCurrentUser}),
    [isCurrentUser, item, t]
  );
  const [action, setAction] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const adminInitials = getAdminInitials(item);

  useEffect(() => {
    if (action) {
      if (action.title == 'Delete') {
        setOpenDeleteModal(true);
      } else {
        handleAction({ ...action, id: item?.id }, item);
      }
    }
  }, [action]);

  return (
    <>
      <TableItem
        dropdownItems={dropdownItems}
        onClickItem={(value) => setAction(value)}
        columnsSize={size - 1}
        onClick={() => onClickRow(item)}
      >
        <div className="flex col-span-1 items-center sm:items-start cursor-pointer px-2">
          <div className="flex h-10 md:w-12 mr-4 bg-gray-100 rounded-full items-center justify-center">
            <Avatar
              size="medium"
              initials={adminInitials}
              image={item?.avatar}
            />
          </div>
          <div className='truncate'>
            <Typography variant={ETextVariant.sm} medium className="mr-4 truncate">
              {item.name}
            </Typography>
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
              className="xl:hidden lg:hidden truncate"
            >
              {item.email || '-'}
            </Typography>
          </div>
        </div>
        <div className="flex items-center col-span-1 md:hidden sm:hidden px-2 ">
          <Typography variant={ETextVariant.sm} className='truncate'>{item.email || '-'}</Typography>
        </div>
        <div className="flex items-center col-span-1 sm:justify-end sm:w-full px-2">
          <Badge status={STATUSES_LABELS[item.status]}>
            {STATUSES_LABELS[item.status]}
          </Badge>
        </div>
      </TableItem>
      <Modal
        show={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        secondButtonAction={() =>
          handleAction({ ...action, id: item?.id }, item)
        }
        firstButtonText={t('cancel')}
        secondButtonText={t('delete')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('delete')} {item.name}?
        </Typography>
      </Modal>
    </>
  );
};

export default AdminsTableItem;
