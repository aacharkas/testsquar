import React, {Dispatch, SetStateAction, useState} from 'react';
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/outline';
import ItemChildRow from './ItemChildRow';
import {IGroup, TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import ItemTable from './ItemTable';
import ItemGroupLine from './ItemGroupLine';
import {IItem} from '../../../../../../libs/web/components/Select/SelectControlled';
import {TGroupForm} from './Items.types';

interface IProps {
  validationData: TValidationDataItem[];
  item: IGroup,
  t: any,
  localState: {
    createGroupModal: boolean;
    createGroupItemModal: boolean;
    deleteGroupModal: boolean;
    showFields: boolean;
  };
  localActions: {
    handleAction: (item, parentId?: string) => Promise<void>;
    closeCreateGroupModal: () => void;
    closeCreateGroupItemModal: () => void;
    setDeleteGroupModal: Dispatch<boolean>;
    setShowFields: Dispatch<boolean>;
    setCreateGroupItemModal: Dispatch<SetStateAction<boolean>>;
    setGroupItemForm: Dispatch<SetStateAction<TGroupForm>>;
  };
  createGroup: (parentId: string) => void;
  onGroupChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string) => void,
  onGroupItemChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string, groupItemId?: string) => void,
  deleteGroupItem: (groupId: string, id: string) => void;
  loading: boolean;
  groupsLoading: TLoadingData;
  itemsLoading: TLoadingData;
  isVerified: boolean;
  unitsData: IItem[];
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
}


const ItemRow = ({
  item,
  t,
  localState,
  localActions,
  createGroup,
  onGroupChange,
  onGroupItemChange,
  validationData,
  deleteGroupItem,
  loading,
  groupsLoading,
  itemsLoading,
  isVerified = false,
  unitsData,
  editItem,
  setEditItem,
}: IProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <div
        className='flex items-center py-4 px-5 border-t border-gray-300 min-h-[72px]'
      >
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ?
            <div>
              <ChevronDownIcon
                className="h-6 w-6 block text-gray-500 mr-4 cursor-pointer"
                aria-hidden="true"
              />
            </div>
            :
            <div>
              <ChevronRightIcon
                className="h-6 w-6 block text-gray-500 mr-4 cursor-pointer"
                aria-hidden="true"
              />
            </div>
          }
        </div>
        <ItemGroupLine
          item={item}
          t={t}
          onChange={onGroupChange}
          localActions={localActions}
          loading={loading}
          groupsLoading={groupsLoading}
          isVerified={isVerified}
          validationData={validationData}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      </div>
      {isMenuOpen &&
        item?.groups?.map((item, index) =>
          <ItemChildRow
            validationData={validationData}
            key={index}
            item={item}
            t={t}
            localState={localState}
            localActions={localActions}
            createGroup={createGroup}
            onGroupChange={onGroupChange}
            onGroupItemChange={onGroupItemChange}
            deleteGroupItem={deleteGroupItem}
            loading={loading}
            groupsLoading={groupsLoading}
            itemsLoading={itemsLoading}
            isVerified={isVerified}
            unitsData={unitsData}
            editItem={editItem}
            setEditItem={setEditItem}
          />
        )
      }
      {isMenuOpen && !item?.groups?.length && !!item?.items?.length &&
        <ItemTable
          validationData={validationData}
          item={item}
          t={t}
          onGroupChange={onGroupChange}
          onGroupItemChange={onGroupItemChange}
          deleteGroupItem={deleteGroupItem}
          isVerified={isVerified}
          groupId={item.id}
          loading={loading}
          groupsLoading={groupsLoading}
          itemsLoading={itemsLoading}
          unitsData={unitsData}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      }
    </>
  );
};

export default ItemRow;
