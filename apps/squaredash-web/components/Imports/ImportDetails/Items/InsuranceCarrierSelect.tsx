import { GET_CLAIM_ITEMS } from '../../../../../../apps/squaredash-web/components/ClaimItems/ClaimItems.api';
import { AsyncSelect, IItem } from '../../../../../../libs/web/components/Select/AsyncSelect';
import { GROUP_ITEM_FIELDS } from './Items.constants';
import classNames from 'classnames';
import styles from '../ImportDetails.module.css';
import { XMarkIcon} from '@heroicons/react/24/outline';
import { TGroupForm } from './Items.types';
import { IGroupItem } from '../ImportDetails.types';

interface IProps {
  handlers: {
    handleChangeGroupItemData: (
        value,
        name: string,
        isPrice: boolean,
        isDate: boolean,
        groupId: string,
        groupItemId: string
    ) => void;
  };
  setIsEdit: (value:boolean) => void;
  groupItemForm: TGroupForm;
  groupId: string;
  localActions: {
    setGroupItemForm: (val) => void;
    setCreateGroupItemModal: (val:boolean) => void;
  };
  item: IGroupItem;
}

const InsuranceCarriersSelect = ({
  item, 
  setIsEdit, 
  groupId, 
  groupItemForm, 
  handlers,
  localActions
}:IProps) => {
  const onChange = (e) => {
    setIsEdit(false); 
    handlers.handleChangeGroupItemData(e?.name,GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION,false,false,groupId, item.id);
    (e as unknown) !=='no_options' && localActions.setGroupItemForm((prevState) => ({ ...prevState, ...{[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION]:e} }));
  };
  return (
    <div className='flex'>
      <div className='w-96'>
        <AsyncSelect
          variableName="search"
          responsePathToArray="claimItems"
          queryStructure={GET_CLAIM_ITEMS}
          initialLoad
          value={
            (groupItemForm[GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION] as IItem) ||
                     { id : 0, name : item.description }
          }
          onChange={onChange}
          numberRequestElements={10}
          responseNameName={'description'}
          addNew={'Create new item'}
          onClick={() => localActions.setCreateGroupItemModal(true)}
        />
      </div>
              
      <div
        className={classNames('flex items-center bg-white rounded-md ml-3 mt-[6px] z-[3] min-h-[40px] w-[36px] h-[20px]', styles['button-shadow'])}>
        <div className='p-2 hover:bg-gray-50 cursor-pointer' onClick={() => setIsEdit(false)}>
          <XMarkIcon
            className="h-5 w-5 text-red-600"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
};
export default InsuranceCarriersSelect;
