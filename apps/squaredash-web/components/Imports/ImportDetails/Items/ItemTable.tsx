import React, {useMemo} from 'react';
import ItemTableHeader from './ItemTableHeader';
import ItemTableItem from './ItemTableItem';
import {getHeaderTableItems} from '../ImportDetails.helper';
import ItemTableFooter from './ItemTableFooter';
import {IGroup, TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import {IItem} from '../../../../../../libs/web/components/Select/SelectControlled';

interface IProps {
  item: IGroup;
  t: any;
  onGroupChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string) => void;
  onGroupItemChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string, groupItemId?: string) => void;
  deleteGroupItem: (groupId: string, id: string) => void;
  isVerified: boolean;
  groupId: string;
  loading: boolean;
  groupsLoading: TLoadingData;
  itemsLoading: TLoadingData;
  unitsData: IItem[];
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
  validationData: TValidationDataItem[];
}

const ItemTable = ({
  item,
  t,
  onGroupChange,
  onGroupItemChange,
  deleteGroupItem,
  isVerified,
  groupId,
  loading,
  groupsLoading,
  itemsLoading,
  unitsData,
  editItem,
  setEditItem,
  validationData,
}: IProps): JSX.Element => {
  const headerItems = useMemo(
    () => getHeaderTableItems({t}),
    [t]
  );

  return (
    <div className='border-t border-gray-300'>
      <table className="min-w-full divide-y divide-gray-300 bg-gray-50">
        <ItemTableHeader items={headerItems}/>
        <tbody className='bg-gray-50'>
          {item?.items?.map((item, index) => (
            <ItemTableItem
              validationData={validationData} 
              index={index + 1}
              key={index}
              item={item}
              groupId={groupId}
              t={t}
              isVerified={isVerified}
              onChange={onGroupItemChange}
              onDelete={deleteGroupItem}
              loading={loading}
              itemsLoading={itemsLoading}
              unitsData={unitsData}
              editItem={editItem}
              setEditItem={setEditItem}
            />
          ))}
        </tbody>
        <ItemTableFooter
          item={item}
          t={t}
          onChange={onGroupChange}
          groupsLoading={groupsLoading}
          isVerified={isVerified}
          editItem={editItem}
          setEditItem={setEditItem}
          validationData={validationData} 
        />
      </table>
    </div>
  );
};

export default ItemTable;
