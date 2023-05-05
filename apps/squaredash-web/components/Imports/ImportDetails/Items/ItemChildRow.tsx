import React, {Dispatch, SetStateAction, useState} from 'react';
import {ChevronDownIcon, ChevronRightIcon} from '@heroicons/react/24/outline';
import ItemTable from './ItemTable';
import {IGroup, TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import classNames from 'classnames';
import ItemGroupLine from './ItemGroupLine';
import {IItem} from '../../../../../../libs/web/components/Select/SelectControlled';
import {TGroupForm} from './Items.types';

interface IProps {
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
  child?: boolean,
  createGroup: (parentId: string) => void,
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
  validationData: TValidationDataItem[];
}


const ItemChildRow = ({
  item,
  t,
  localState,
  localActions,
  child = false,
  createGroup,
  onGroupChange,
  onGroupItemChange,
  deleteGroupItem,
  loading,
  groupsLoading,
  itemsLoading,
  isVerified,
  unitsData,
  editItem,
  setEditItem,
  validationData,
}: IProps): JSX.Element => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <>
      <div
        className={classNames('flex items-center py-4 pr-5 pl-16 border-t border-gray-300 min-h-[72px]',
          child ? 'pl-32' : 'pl-16')}
      >
        <div onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ?
            <div>
              <ChevronDownIcon
                className="h-6 w-6 text-gray-500 mr-4 cursor-pointer"
                aria-hidden="true"
              />
            </div>
            :
            <div>
              <ChevronRightIcon
                className="h-6 w-6 text-gray-500 mr-4 cursor-pointer"
                aria-hidden="true"
              />
            </div>
          }
        </div>
        <ItemGroupLine
          item={item}
          t={t}
          localActions={localActions}
          onChange={onGroupChange}
          loading={loading}
          groupsLoading={groupsLoading}
          isVerified={isVerified}
          validationData={validationData}
          editItem={editItem}
          setEditItem={setEditItem}
        />
      </div>
      {
        isMenuOpen &&
        item?.groups?.map((item, index) =>
          <ItemChildRow
            key={index}
            validationData={validationData}
            item={item}
            t={t}
            localState={localState}
            localActions={localActions}
            child
            createGroup={createGroup}
            onGroupChange={onGroupChange}
            onGroupItemChange={onGroupItemChange}
            deleteGroupItem={deleteGroupItem}
            groupsLoading={groupsLoading}
            loading={loading}
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
          validationData={validationData} item={item}
          t={t}
          groupId={item.id}
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
      }
    </>
  );
};

export default ItemChildRow;
