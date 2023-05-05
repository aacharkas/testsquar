import React, {useMemo} from 'react';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import ItemRow from './ItemRow';
import {useTranslation} from 'next-i18next';
import {IGroup, TEditedField, TImportDetailsData, TValidationDataItem} from '../ImportDetails.types';
import {IMPORT_DETAILS_FIELDS} from '../ImportDetails.constants';
import {EllipsisVerticalIcon} from '@heroicons/react/20/solid';
import DropdownItem from '../../../../../../libs/web/components/Dropdown/DropdownItem';
import Dropdown from '../../../../../../libs/web/components/Dropdown/Dropdown';
import {getGroupDropdowns} from './Items.helper';
import useImportItemsData from './hooks/useImportItemsData';
import CreateGroupModal from '../Modals/CreateGroupModal';
import DeleteGroupModal from '../Modals/DeleteGroupModal';
import Spinner from '../../../../../../libs/web/components/Spinner/Spinner';
import CreateGroupItemModal from '../Modals/CreateGroupItemModal';

interface IProps {
  data: TImportDetailsData;
  isVerified: boolean;
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
  validationData: TValidationDataItem[];
}

const Items = ({
  data,
  isVerified,
  editItem,
  setEditItem,
  validationData,
}: IProps): JSX.Element => {
  const {
    localState,
    localActions,
    formattedData,
    handlers,
    unitsData,
    groupForm,
    groupFormErrors,
    groupItemForm,
    groupItemFormErrors,
    localErrorText,
  } = useImportItemsData();
  const {t} = useTranslation('imports');
  const groups = data[IMPORT_DETAILS_FIELDS.GROUPS] as IGroup[];
  const dropdownItems = useMemo(
    () => getGroupDropdowns({t, isHeader: true}),
    [data]
  );

  return (
    <>
      <div className='mt-4 bg-white pt-6 rounded-md sm:rounded-none border border-gray-200'>
        {formattedData.loading && <Spinner contentSize/>}
        <div className='flex items-center justify-between mx-5 mb-8'>
          <Typography variant={ETextVariant.lg} medium>
            {t('items')}
          </Typography>
          {!isVerified && <Dropdown
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
                  onClick={() => localActions.handleAction(dropdownItem)}
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
          </Dropdown>}
        </div>
        {groups?.map((item, index) =>
          <ItemRow
            validationData={validationData}
            item={item}
            key={index}
            t={t}
            localState={localState}
            localActions={localActions}
            createGroup={handlers.handleCreateGroup}
            onGroupChange={handlers.handleChangeGroupData}
            onGroupItemChange={handlers.handleChangeGroupItemData}
            deleteGroupItem={handlers.handleDeleteGroupItem}
            loading={formattedData.loading}
            groupsLoading={formattedData.groupsFieldsLoading}
            itemsLoading={formattedData.itemsFieldsLoading}
            isVerified={isVerified}
            unitsData={unitsData}
            editItem={editItem}
            setEditItem={setEditItem}
          />
        )}
      </div>
      <CreateGroupModal
        t={t}
        groupForm={groupForm}
        groupFormErrors={groupFormErrors}
        localErrorText={localErrorText}
        createGroupModal={localState.createGroupModal}
        closeCreateGroupModal={localActions.closeCreateGroupModal}
        handleCreateGroup={handlers.handleCreateGroup}
        handleChangeGroupForm={handlers.handleChangeGroupForm}
        loading={formattedData.modalLoading}
      />
      <DeleteGroupModal
        t={t}
        deleteGroupModal={localState.deleteGroupModal}
        setDeleteGroupModal={localActions.setDeleteGroupModal}
        handleDeleteGroup={handlers.handleDeleteGroup}
        loading={formattedData.modalLoading}
      />
      <CreateGroupItemModal
        t={t}
        groupItemForm={groupItemForm}
        groupItemFormErrors={groupItemFormErrors}
        localErrorText={localErrorText}
        createGroupItemModal={localState.createGroupItemModal}
        closeCreateGroupItemModal={localActions.closeCreateGroupItemModal}
        handleCreateGroupItem={handlers.handleCreateGroupItem}
        handleChangeGroupItemForm={handlers.handleChangeGroupItemForm}
        loading={formattedData.modalLoading}
        unitsData={unitsData}
        showFields={localState.showFields}
        setShowFields={localActions.setShowFields}
      />
    </>
  );
};

export default Items;
