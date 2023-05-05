import Button from '../../../../../libs/web/components/Button/Button';
import { useTranslation } from 'next-i18next';
import React from 'react';

import Typography from '../../../../../libs/web/components/Typography/Typography';
import PopoverPanel from '../../../../../libs/web/components/Popover/Popover';
import { ETextColor, ETextVariant } from '../../../../../libs/web/constants/enums';
import AddIcon from '@mui/icons-material/Add';
import { Popover } from '@headlessui/react';
import SlideModal from '../../../../../libs/web/components/SlideModal/SlideModal';

export const CustomFieldsPopover = ({customFields, onClick, position = 'top'}) => {
  return (
    <>
      <PopoverPanel
        button={
          <InsertButton />
        }
        position={position}
      >
        <div className="flex gap-4">
          {customFields && customFields.groups?.map((group, idx) => (
            <div className="flex flex-col w-1/3" key={idx}>
              <div className="border-b border-gray-200 p-2.5">
                <Typography variant={ETextVariant.base} medium>
                  {group.name}
                </Typography>
              </div>
              {group?.items.map((item, idx) => (
                <Popover.Button key={idx} as="div">
                  <div className="p-2.5" onClick={() => onClick(item.field)}>
                    <Typography variant={ETextVariant.base} className="cursor-pointer">
                      {item.displayName}
                    </Typography>
                  </div>
                </Popover.Button>
              ))}
            </div>
          ))}
        </div>
      </PopoverPanel>
    </>
  );
};

export const CustomFieldsSideBar = ({isModalOpen, closeModal, customFields, onClick}) => {
  const { t } = useTranslation(['buttons']);
  return (
    <>
      <SlideModal dialogTitle={t('insert_fields')} isModalOpen={isModalOpen} closeModal={closeModal}>
        {customFields && customFields.groups?.map((group, idx) => (
          <div className="flex flex-col" key={idx}>
            <div className="border-b border-gray-200 px-2 py-2.5">
              <Typography variant={ETextVariant.sm} medium>
                {group.name}
              </Typography>
            </div>
            {group?.items.map((item, idx) => (
              <div key={idx} className="p-2" onClick={() => onClick(item.field)}>
                <Typography variant={ETextVariant.sm} className="cursor-pointer">
                  {item.displayName}
                </Typography>
              </div>
            ))}
          </div>
        ))}
      </SlideModal>
    </>
  );
};

export const InsertButton = ({onClick = null}) => {
  const { t } = useTranslation(['buttons']);
  return (
    <>
      <Button theme="light" onClick={onClick}>
        <AddIcon className="h-6 w-6 mr-2 text-gray-500"/>
        <Typography variant={ETextVariant.base}>
          {t('insert_fields')}
        </Typography>
      </Button>
    </>
  );
};

export const BackToDefault = ({onClick = null}) => {
  const { t } = useTranslation(['buttons']);
  return (
    <>
      <Typography
        variant={ETextVariant.xs}
        medium color={ETextColor.primary}
        onClick={onClick}
        className="mt-8 ml-4 sm:mt-4 sm:ml-0 hover:cursor-pointer"
      >
        {t('back_to_default')}
      </Typography>
    </>
  );
};

