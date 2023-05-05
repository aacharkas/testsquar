import React, {useState} from 'react';
import classNames from 'classnames';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import {formatPrice} from '../../../../lib/formatPrice';
import {TrashIcon} from '@heroicons/react/24/outline';
import {IGroupItem, TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import EditedField from '../EditedField/EditedField';
import CreateNoteModal from '../Modals/CreateNoteModal';
import ValidationTooltip from '../ValidationTooltip';
import {IMPORT_VALIDATION_FIELDS} from '../ImportDetails.constants';
import {IItem} from '../../../../../../libs/web/components/Select/AsyncSelect';
import useImportItemsData from './hooks/useImportItemsData';
import {GROUP_ITEM_FIELDS} from './Items.constants';
import CreateGroupItemModal from '../Modals/CreateGroupItemModal';
import InsuranceCarriersSelect from './InsuranceCarrierSelect';

interface IProps {
  index: number;
  item: IGroupItem;
  groupId: string;
  t: any;
  isVerified: boolean;
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string, groupItemId?: string) => void;
  onDelete: (groupId: string, id: string) => void;
  loading: boolean;
  itemsLoading: TLoadingData;
  unitsData: IItem[];
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
  validationData: TValidationDataItem[];
}


const ItemTableItem = ({
  index,
  item,
  groupId,
  t,
  isVerified,
  onChange,
  onDelete,
  loading,
  itemsLoading,
  unitsData,
  editItem,
  setEditItem,
  validationData,
}: IProps): JSX.Element => {
  const [addNoteModal, setAddNoteModal] = useState<boolean>(false);
  const [isNotesActive, setIsNotesActive] = useState(false);
  const [isDescActive, setIsDescActive] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const {
    groupItemForm,
    handlers,
    groupItemFormErrors,
    localState,
    localActions,
    localErrorText,
    formattedData,
  } = useImportItemsData();
  const setActiveNotesState = (e) => {
    setIsNotesActive(e?.target?.scrollWidth > e?.target?.offsetWidth);
  };
  const setActiveDescState = (e) => {
    setIsDescActive(e?.target?.scrollWidth > e?.target?.offsetWidth);
  };
  const deleteNote = () => {
    onChange(null, GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES, false, false, groupId, item.id);
  };

  return (
    <>
      <tr className='items-center px-4 pt-6 relative hidden md:flex sm:flex'>
        <EditedField
          item={{
            value: item.sequence.toString().padStart(2, '0'),
            name: GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE,
          }}
          onChange={onChange}
          id={item.id}
          groupId={groupId}
          isAbsolute
          isVerified={isVerified}
          loading={itemsLoading}
          editItem={editItem}
          setEditItem={setEditItem}
          validationData={validationData}
          className='mr-4'
        />
        <div className='min-w-max absolute left-12 sm:min-w-[250px]'>
          <div>
            <div data-tooltip={item.description}
              className={classNames('h-full w-full flex items-center', {'hidden': !isDescActive})}/>
            {!isEdit && <div onMouseOver={(e) => setActiveDescState(e)}>
              <div className="flex" onClick={() => setIsEdit(true)}>
                <Typography variant={ETextVariant.sm} medium
                  className='max-w-2xl md:max-w-xl sm:max-w-xs truncate'>
                  {item.description}
                </Typography>
                <ValidationTooltip
                  id={item.id}
                  field={IMPORT_VALIDATION_FIELDS.GROUP_NAME_VALIDATE}
                  validationData={validationData}
                />
              </div>
            </div>}
            {isEdit &&
              <InsuranceCarriersSelect
                item={item}
                setIsEdit={setIsEdit}
                groupId={groupId}
                groupItemForm={groupItemForm}
                handlers={handlers}
                localActions={localActions}
              />
            }
            {!item.notes && !isVerified &&
              <Typography
                variant={ETextVariant.xs}
                color={ETextColor.primary}
                medium
                onClick={() => setAddNoteModal(true)}
                className='cursor-pointer'
              >
                {t('add_note')}
              </Typography>
            }
          </div>
          <div>
            <div data-tooltip={item.notes}
              className={classNames('h-full w-full flex items-center', {'hidden': !isNotesActive})}/>
            <div onMouseOver={(e) => setActiveNotesState(e)}>
              <div className="flex">
                <EditedField
                  item={{
                    value: item.notes,
                    name: GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES,
                  }}
                  onChange={onChange}
                  color={ETextColor.gray}
                  isVerified={isVerified}
                  loading={itemsLoading}
                  validationData={validationData}
                  editItem={editItem}
                  setEditItem={setEditItem}
                  groupId={item.id}
                  maxLength={500}
                  className='max-w-2xl md:max-w-xl sm:max-w-xs truncate'
                />
                <ValidationTooltip id={item.id} field={IMPORT_VALIDATION_FIELDS.GROUP_NOTE_VALIDATE}
                  validationData={validationData}
                />
              </div>
            </div>
            {!!item.notes && !isVerified &&
              <Typography
                variant={ETextVariant.xs}
                color={ETextColor.primary}
                medium
                onClick={deleteNote}
                className='cursor-pointer'
              >
                {t('delete_note')}
              </Typography>
            }
          </div>
        </div>
      </tr>
      <tr
        className="xl:border-b xl:border-gray-200 xl:h-[72px] lg:border-b lg:border-gray-200 lg:h-[72px] md:border-b md:border-gray-200 md:h-[72px]">
        <td className="py-4 pl-4 pr-3 text-sm sm:pl-0 md:hidden sm:hidden relative">
          <EditedField
            item={{
              value: item.sequence.toString().padStart(2, '0'),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE,
            }}
            onChange={onChange}
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-4 pr-3 text-sm sm:pl-0 md:hidden sm:hidden relative">
          <div>
            {!isEdit && <div className="flex" onClick={() => setIsEdit(true)}>
              <Typography variant={ETextVariant.sm} medium>
                {item.description}
              </Typography>
              <ValidationTooltip
                id={item.id}
                field={IMPORT_VALIDATION_FIELDS.GROUP_NAME_VALIDATE}
                validationData={validationData}
              />
            </div>}
            {isEdit &&
              <InsuranceCarriersSelect
                item={item}
                setIsEdit={setIsEdit}
                groupId={groupId}
                groupItemForm={groupItemForm}
                handlers={handlers}
                localActions={localActions}
              />
            }
            {!item.notes && !isVerified && <Typography
              variant={ETextVariant.xs}
              color={ETextColor.primary}
              medium
              onClick={() => setAddNoteModal(true)}
              className='cursor-pointer'
            >
              {t('add_note')}
            </Typography>}
          </div>
          <div className="flex">
            <EditedField
              item={{
                value: item.notes,
                name: GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES,
              }}
              onChange={onChange}
              color={ETextColor.gray}
              isVerified={isVerified}
              loading={itemsLoading}
              validationData={validationData}
              editItem={editItem}
              setEditItem={setEditItem}
              groupId={item.id}
              maxLength={500}
            />
            <ValidationTooltip
              id={item.id}
              field={IMPORT_VALIDATION_FIELDS.GROUP_NOTE_VALIDATE}
              validationData={validationData}
            />
          </div>
          {!!item.notes && !isVerified &&
            <Typography
              variant={ETextVariant.xs}
              color={ETextColor.primary}
              medium
              onClick={deleteNote}
              className='cursor-pointer'
            >
              {t('delete_note')}
            </Typography>
          }
        </td>
        <td className="px-3 py-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.quantity),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_QUANTITY_VALIDATE,
            }}
            selectedItem={
              {
                id: 1,
                type: GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT,
                name: item.unitOfMeasurement
              }
            }
            label={t('qty')}
            onChange={onChange}
            id={item.id}
            isPrice
            groupId={groupId}
            selectOptions={unitsData}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="px-3 py-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.unitPrice),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_UNIT_PRICE_VALIDATE,
            }}
            label={t('unit')}
            onChange={onChange}
            isPrice
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.tax),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_TAX,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_TAX_VALIDATE,
            }}
            label={t('tax')}
            onChange={onChange}
            isPrice
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.overhead),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_OVERHEAD_VALIDATE,
            }}
            label={t('op')}
            onChange={onChange}
            isPrice
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right sm:hidden relative">
          <EditedField
            item={{
              value: formatPrice(item.rcv),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_RCV,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_RCV_VALIDATE,
            }}
            label={t('rcv')}
            onChange={onChange}
            isPrice
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative sm:hidden relative">
          <EditedField
            item={{
              value: formatPrice(item.depreciationSum),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_DEPRECIATION_SUM_VALIDATE,
            }}
            secondItem={{
              value: item.depreciationPercentage,
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_DEPRECIATION_PERCENT_VALIDATE,
            }}
            checkItem={{
              value: item.isDepreciationRefundable,
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE
            }}
            label={t('dep')}
            onChange={onChange}
            id={item.id}
            isPrice
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            className='top-[10%]'
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right sm:hidden relative">
          <EditedField
            item={{
              value: formatPrice(item.acv),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_ACV,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_ACV_VALIDATE,
            }}
            label={t('acv')}
            onChange={onChange}
            isPrice
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td
          className={classNames({'hidden': isVerified}, 'py-4 pl-3 pr-4 text-right sm:hidden cursor-pointer')}
          onClick={() => onDelete(groupId, item.id)}
        >
          <TrashIcon className="h-5 w-5 text-gray-500"/>
        </td>
      </tr>
      <tr className='h-[72px] hidden sm:table-row'>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.rcv),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_RCV,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_RCV_VALIDATE,
            }}
            label={t('rcv')}
            onChange={onChange}
            isPrice
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.depreciationSum),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_DEPRECIATION_SUM_VALIDATE,
            }}
            secondItem={{
              value: item.depreciationPercentage,
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_DEPRECIATION_PERCENT_VALIDATE,
            }}
            checkItem={{
              value: item.isDepreciationRefundable,
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE
            }}
            label={t('dep')}
            onChange={onChange}
            id={item.id}
            isPrice
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            className='top-[10%]'
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.acv),
              name: GROUP_ITEM_FIELDS.GROUP_ITEM_ACV,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEM_ACV_VALIDATE,
            }}
            label={t('acv')}
            onChange={onChange}
            isPrice
            id={item.id}
            groupId={groupId}
            isAbsolute
            isVerified={isVerified}
            loading={itemsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td
          className={classNames({'hidden': isVerified}, 'py-4 pl-3 pr-4 text-right cursor-pointer')}
          onClick={() => onDelete(groupId, item.id)}
        >
          <TrashIcon className="h-5 w-5 text-gray-500"/>
        </td>
      </tr>
      <CreateGroupItemModal
        t={t}
        groupItemForm={groupItemForm}
        groupItemFormErrors={groupItemFormErrors}
        localErrorText={localErrorText}
        createGroupItemModal={localState.createGroupItemModal}
        closeCreateGroupItemModal={localActions.closeCreateGroupItemModal}
        handleCreateGroupItem={handlers.handleCreateGroupItem}
        handleChangeGroupItemForm={handlers.handleChangeGroupItemForm}
        loading={formattedData.loading}
        showFields={localState.showFields}
        setShowFields={localActions.setShowFields}
        hideFields={true}
        unitsData={unitsData}
      />
      <CreateNoteModal
        item={item}
        t={t}
        addNoteModal={addNoteModal}
        closeModal={() => setAddNoteModal(false)}
        loading={loading}
        onChange={onChange}
        groupId={groupId}
      />
    </>
  );
};

export default ItemTableItem;
