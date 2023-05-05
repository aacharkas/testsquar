import { MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useState } from 'react';

import Badge from '../../../../libs/web/components/Badge/Badge';
import Modal from '../../../../libs/web/components/Modal/Modal';
import TableItem from '../../../../libs/web/components/Table/TableItem';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextColor, ETextVariant } from '../../../../libs/web/constants/enums';
import { formatPhoneNumber } from '../../lib/formatPhoneNumber';
import { TCompanyLocation } from './LocationForm.types';
import getItemDropdowns from './LocationTable.helper';

interface IProps {
  item: TCompanyLocation;
  size: number;
  handleAction: (item: any) => void;
  localErrorText?: (name: string, value: string, options?: object) => string;
}

const LocationTableItem = ({ item, size, handleAction, localErrorText }: IProps) => {
  const { t } = useTranslation('buttons');
  const dropdownItems = getItemDropdowns(item, t);
  const [action, setAction] = useState(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [openWarningModal, setOpenWarningModal] = useState<boolean>(false);

  useEffect(() => {
    if (action) {
      if (action.title == 'Delete') {
        if (item?.isMain) {
          setOpenWarningModal(true);
        } else {
          setOpenDeleteModal(true);
        }
      } else {
        handleAction({ ...action, id: item?.id });
      }
    }
  }, [action]);

  return (
    <>
      <TableItem
        dropdownItems={dropdownItems}
        onClickItem={(value) => setAction(value)}
        columnsSize={size}
      >
        <div className="flex col-span-2 items-center sm:items-start md:col-span-1">
          <div className="flex h-10 w-10 md:w-12 sm:w-12 mr-4 bg-gray-100 rounded-full items-center justify-center min-w-[2.5rem] min-h-[2.5rem]">
            <MapPinIcon className="text-gray-500 h-6 w-6" />
          </div>
          <div>
            <div className="flex">
              <Typography variant={ETextVariant.sm} medium className="mr-4">
                {item.name}
              </Typography>
              {item.isMain && (
                <Badge color="blue" className="mr-4">
                  {t('main')}
                </Badge>
              )}
            </div>
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
              className="flex items-center"
            >
              {item?.address?.formattedAddress}
            </Typography>
          </div>
        </div>
        <div className="flex items-center col-span-1 md:flex-col sm:flex-col md:items-start sm:items-start md:justify-center">
          <Typography variant={ETextVariant.sm}>{item.email}</Typography>
          <Typography
            variant={ETextVariant.sm}
            className="xl:hidden lg:hidden md:flex sm:flex"
          >
            {formatPhoneNumber(item?.phone)}
          </Typography>
        </div>
        <Typography
          variant={ETextVariant.sm}
          className="flex items-center col-span-1 md:hidden sm:hidden"
        >
          {formatPhoneNumber(item?.phone)}
        </Typography>
      </TableItem>
      <Modal
        show={openDeleteModal}
        closeModal={() => setOpenDeleteModal(false)}
        secondButtonAction={() => handleAction({ ...action, id: item?.id })}
        firstButtonText={t('cancel')}
        secondButtonText={t('proceed')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {localErrorText('IM0013', 'location', {name: item.name}).toUpperCase()}
        </Typography>
      </Modal>
      <Modal
        show={openWarningModal}
        closeModal={() => setOpenWarningModal(false)}
        firstButtonText={t('cancel')}
      >
        <Typography variant={ETextVariant.lg} medium>
          {t('cannot_delete_main_location')}
        </Typography>
      </Modal>
    </>
  );
};

export default LocationTableItem;
