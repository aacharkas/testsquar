import React, {Dispatch, SetStateAction, useMemo, useState} from 'react';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {IGroup, TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import EditedField from '../EditedField/EditedField';
import {GROUP_FIELDS} from './Items.constants';
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import DropdownItem from '../../../../../../libs/web/components/Dropdown/DropdownItem';
import Dropdown from '../../../../../../libs/web/components/Dropdown/Dropdown';
import {getGroupDropdowns} from './Items.helper';
import CreateNoteModal from '../Modals/CreateNoteModal';
import {IMPORT_VALIDATION_FIELDS} from '../ImportDetails.constants';
import {TGroupForm} from './Items.types';

interface IProps {
  item: IGroup;
  t: any;
  localActions: {
    handleAction: (item, parentId?: string) => Promise<void>;
    closeCreateGroupModal: () => void;
    closeCreateGroupItemModal: () => void;
    setDeleteGroupModal: Dispatch<boolean>;
    setShowFields: Dispatch<boolean>;
    setCreateGroupItemModal: Dispatch<SetStateAction<boolean>>;
    setGroupItemForm: Dispatch<SetStateAction<TGroupForm>>;
  };
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string) => void;
  loading: boolean;
  groupsLoading: TLoadingData;
  isVerified: boolean;
  validationData?: TValidationDataItem[];
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
}


const ItemGroupLine = ({
  item,
  t,
  localActions,
  onChange,
  loading,
  groupsLoading,
  isVerified,
  validationData,
  editItem,
  setEditItem,
}: IProps): JSX.Element => {
  const [addNoteModal, setAddNoteModal] = useState<boolean>(false);
  const dropdownItems = useMemo(
    () => getGroupDropdowns({t}),
    [item]
  );

  const deleteNote = () => {
    onChange(null, GROUP_FIELDS.GROUP_NOTES, false, false, item.id);
  };

  return (
    <>
      <div className='w-full flex justify-between'>
        <div className='w-full max-w-4xl md:max-w-2xl sm:max-w-xs break-words'>
          <div className='flex items-center'>
            <EditedField
              item={{
                value: item.name,
                name: GROUP_FIELDS.GROUP_NAME,
                validationField: IMPORT_VALIDATION_FIELDS.GROUP_NAME_VALIDATE,
              }}
              onChange={onChange}
              mediumFont={false}
              isVerified={isVerified}
              loading={groupsLoading}
              validationData={validationData}
              editItem={editItem}
              setEditItem={setEditItem}
              groupId={item.id}
              maxLength={200}
            />
            {!item.notes && !isVerified && <Typography
              variant={ETextVariant.xs}
              color={ETextColor.primary}
              medium
              onClick={() => setAddNoteModal(true)}
              className='cursor-pointer ml-4'
            >
              {t('add_note')}
            </Typography>}
          </div>
          <>
            {!!item.notes &&
              <div className='flex items-center'>
                <EditedField
                  item={{
                    value: item.notes,
                    name: GROUP_FIELDS.GROUP_NOTES,
                    validationField: IMPORT_VALIDATION_FIELDS.GROUP_NOTE_VALIDATE,
                  }}
                  onChange={onChange}
                  color={ETextColor.gray}
                  mediumFont={false}
                  isVerified={isVerified}
                  loading={groupsLoading}
                  validationData={validationData}
                  editItem={editItem}
                  setEditItem={setEditItem}
                  groupId={item.id}
                  maxLength={500}
                />
                {!isVerified &&
                  <Typography
                    variant={ETextVariant.xs}
                    color={ETextColor.primary}
                    medium
                    onClick={deleteNote}
                    className='cursor-pointer ml-4'
                  >
                    {t('delete_note')}
                  </Typography>
                }
              </div>
            }
          </>
        </div>
      </div>
      {!isVerified &&
        <Dropdown
          button={
            <EllipsisVerticalIcon
              className="h-6 w-6 text-gray-500"
              aria-hidden="true"
            />
          }
        >
          {dropdownItems?.map((dropdownItem, index) => {
            return (
              <DropdownItem
                key={index}
                onClick={() => localActions.handleAction(dropdownItem, item.id)}
              >
                <Typography
                  variant={ETextVariant.sm}
                  color={ETextColor.gray}
                  medium
                >
                  {dropdownItem.title}
                </Typography>
              </DropdownItem>
            );
          })}
        </Dropdown>
      }
      <CreateNoteModal
        item={item}
        t={t}
        addNoteModal={addNoteModal}
        closeModal={() => setAddNoteModal(false)}
        loading={loading}
        onChange={onChange}
      />
    </>
  );
};

export default ItemGroupLine;
