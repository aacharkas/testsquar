import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';
import { useTranslation } from 'next-i18next';
import React, {useEffect, useMemo, useState} from 'react';

import Avatar from '../../../../libs/web/components/Avatar/Avatar';
import Badge from '../../../../libs/web/components/Badge/Badge';
import Dropdown from '../../../../libs/web/components/Dropdown/Dropdown';
import DropdownItem from '../../../../libs/web/components/Dropdown/DropdownItem';
import Modal from '../../../../libs/web/components/Modal/Modal';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { STATUSES_LABELS } from '../../../../libs/web/constants/constants';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { getAdminInitials, getItemDropdowns } from './Admins.helper';
import { Admin } from './Admins.types';

interface IProps {
  item: Admin;
  handleAction: (val: any, item: Admin) => void;
  currentUserId?: string;
}

const AdminDetails = ({ item, handleAction, currentUserId }: IProps) => {
  const { t } = useTranslation(['buttons', 'admins']);
  const isCurrentUser = useMemo(
    () => currentUserId == item?.id,
    [currentUserId, item?.id]
  );
  const dropdownItems = useMemo(
    () => getItemDropdowns({item, t, isDetails: true, isCurrentUser}),
    [isCurrentUser, item, t]
  );
  const adminInitials = getAdminInitials(item);
  const [action, setAction] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

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
    <div>
      <div className="flex h-32 mr-4 items-center justify-center">
        <Avatar size="huge" initials={adminInitials} image={item?.avatar} />
      </div>
      <div className="flex col-span-3 items-center sm:items-start mt-5">
        <Typography variant={ETextVariant.xl_2} medium className="mr-4">
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
      <div className="border-b border-gray-100 py-4">
        <div className="items-center mt-4">
          <Typography variant={ETextVariant.sm} color={ETextColor.gray}>
            {t('contact_email', { ns: 'admins' })}
          </Typography>
          <Typography variant={ETextVariant.sm}>{item.email}</Typography>
        </div>
      </div>
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
    </div>
  );
};

export default AdminDetails;
