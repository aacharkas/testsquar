import Typography from '../../../../../../libs/web/components/Typography/Typography';
import React, {useMemo} from 'react';
import classNames from 'classnames';
import {CheckIcon, XMarkIcon} from '@heroicons/react/24/outline';
import styles from '../ImportDetails.module.css';

import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import DatePicker from '../../../../../../libs/web/components/DatePicker/DatePicker';
import {MIN_DATE_FROM} from '../../Imports.constants';
import PhoneInput from '../../../../../../libs/web/components/PhoneInput/PhoneInput';
import SelectControlled, {IItem} from '../../../../../../libs/web/components/Select/SelectControlled';
import Input from '../../../../../../libs/web/components/Input/Input';
import DialogMessage from '../../../../../../libs/web/components/DialogMessage/DialogMessage';
import {useTranslation} from 'next-i18next';
import Checkbox from '../../../../../../libs/web/components/Checkbox/Checkbox';
import useEditedFieldData from './hooks/useEditedFieldData';
import {TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import Spinner from '../../../../../../libs/web/components/Spinner/Spinner';
import ValidationTooltip from '../ValidationTooltip';

interface Item {
  title?: string;
  type?: string;
  value: string | number | boolean;
  name: string;
  messageProps?: any;
  validationField?: string;
  selectOptions?: IItem[];
  isRequired?: boolean;
}


interface IProps {
  item: Item;
  selectedItem?: IItem;
  secondItem?: Item;
  checkItem?: Item;
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean, id?: string, uuid?: string) => void;
  inputClassName?: string;
  isSelect?: boolean;
  isPrice?: boolean;
  fontSize?: ETextVariant;
  color?: ETextColor;
  mediumFont?: boolean;
  isDate?: boolean;
  isPhone?: boolean;
  isAddress?: boolean;
  id?: string;
  groupId?: string;
  isAbsolute?: boolean;
  isVerified: boolean;
  selectOptions?: IItem[];
  label?: string;
  className?: string;
  textClassName?: string;
  loading: TLoadingData;
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
  maxLength?: number;
  validationData?: TValidationDataItem[];
  actions?: {
    firstButtonAction?: () => void;
    secondButtonAction?: (value) => void;
  };
}

const EditedField = ({
  item,
  selectedItem,
  secondItem,
  checkItem,
  onChange,
  inputClassName,
  isSelect = false,
  isPrice = false,
  fontSize,
  color,
  mediumFont = true,
  isDate = false,
  isPhone = false,
  isAddress = false,
  id,
  groupId,
  isAbsolute = false,
  isVerified,
  selectOptions,
  label,
  className,
  textClassName,
  loading,
  editItem,
  setEditItem,
  maxLength = 250,
  validationData,
  actions,
}: IProps): JSX.Element => {
  const {
    localState,
    localActions,
    handlers,
  } = useEditedFieldData({
    item,
    selectedItem,
    secondItem,
    checkItem,
    setEditItem,
    onChange,
    id,
    groupId,
    isPrice,
    isDate,
    isSelect,
  });
  const {t} = useTranslation('imports');
  const isEdit = useMemo(() => {
    return !id ? JSON.stringify(editItem) === JSON.stringify(item) : JSON.stringify(editItem) === JSON.stringify({
      ...item,
      'id': id
    });
  }, [item, id]);

  return (
    <>
      {!(Object.keys(loading).length && loading[item.name] == true && (loading.id ? loading.id === id : true)) ?
        <>
          <div className={classNames({
            'hidden': isEdit && isAbsolute
          })}>
            <Typography variant={ETextVariant.sm} color={ETextColor.gray} className='hidden md:block sm:block'>
              {label}
            </Typography>
          </div>
          <div
            className={classNames('z-[3]', className,
              {
                'hidden': !isEdit || isVerified,
                'absolute min-w-[160px]': isAbsolute,
                'top-[20%]': !className,
                'min-w-[238px] left-0': !!secondItem,
              },
            )}
          >
            <div className='flex items-center h-[40px]'>
              <Input
                className={classNames(
                  'block w-full rounded-md text-sm text-gray-900 min-h-min',
                  inputClassName, {
                    'min-w-[76px]': isAbsolute
                  }
                )}
                isVisible={!isDate && !isPhone && !isAddress && !isSelect}
                onChangeText={(e) => localActions.setValue(e.target.value)}
                maxLength={maxLength}
                value={localState.value == '-' ? '' : (localState.value as string)}
              />
              <div className={classNames({'hidden': !isDate}, inputClassName)}>
                <DatePicker
                  onChange={(value) => handlers.handleDate(value)}
                  value={!!localState.value && localState.value as string}
                  minDate={new Date(MIN_DATE_FROM)}
                  maxDate={new Date()}
                  fullWidth
                />
              </div>
              <PhoneInput
                onChangeText={(val) => localActions.setValue(val)}
                value={localState.value == '-' ? '' : localState.value as string}
                isVisible={isPhone}
                inputClassName={inputClassName}
              />
              <div className={classNames('relative max-w-[74px] ml-1', {'hidden': !secondItem})}>
                <Input
                  className='w-full rounded-md text-sm text-gray-900'
                  onChangeText={(e) => localActions.setSecondValue(e.target.value)}
                  value={localState.secondValue}
                  maxLength={2}
                />
                <Typography variant={ETextVariant.sm} className='absolute top-3.5 right-1'>%</Typography>
              </div>
              <SelectControlled
                options={selectOptions}
                value={localState.selectedValue}
                onChangeValue={(e) => localActions.setSelectedValue(e)}
                isVisible={(!!selectedItem && !!selectOptions) || isSelect}
                className={classNames({'ml-2': isAbsolute}, inputClassName)}
              />
              <Input
                refInput={localState.ref}
                className={classNames(
                  'w-full rounded-md text-sm text-gray-900',
                  inputClassName
                )}
                isVisible={isAddress}
                onChangeText={(e) => {
                  localActions.setValue(e.target.value);
                }}
                value={localState.value == '-' ? '' : localState.value as string}
                maxLength={maxLength}
              />
              <div
                className={classNames('flex items-center bg-white rounded-md ml-3 z-[3] min-h-[40px]', styles['button-shadow'])}>
                <div
                  className='p-2 hover:bg-gray-50 cursor-pointer'
                  onClick={handlers.onFinishEdit}
                >
                  <CheckIcon
                    className="h-5 w-5 text-green-700"
                    aria-hidden="true"
                  />
                </div>
                <div className='p-2 hover:bg-gray-50 cursor-pointer' onClick={handlers.onCloseEdit}>
                  <XMarkIcon
                    className="h-5 w-5 text-red-600"
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>
            <Checkbox
              label={t('recoverable')}
              isVisible={!!checkItem}
              onChange={(e) => localActions.setCheckedValue(e?.target?.checked)}
              checked={localState.checkedValue as boolean}
              className='mt-2'
            />
          </div>
          <div
            className={classNames('flex items-center cursor-pointer', textClassName, {
              'justify-end': isAbsolute, 'hidden': isEdit
            })}
            onClick={() => setEditItem({...item, 'id': id})}
          >
            <Typography
              variant={fontSize || ETextVariant.sm}
              color={color}
              medium={mediumFont}
              className={classNames('cursor-pointer', {'hidden': isEdit && !isVerified})}
            >
              {isPrice && !secondItem && item.value !== '0' && '$'}{item.value} {selectedItem?.name}
              {!!checkItem && !!checkItem.value &&
                <DialogMessage text={t('depreciation_is_recoverable')}>
                  <CheckIcon className="h-3 w-3 text-gray-700 ml-1 cursor-pointer"/>
                </DialogMessage>
              }
            </Typography>
            <ValidationTooltip
              id={id}
              field={item.validationField}
              validationData={validationData}
              messageProps={item.messageProps}
              hidden={isEdit}
              actions={actions}
            />
          </div>
          <div
            className={classNames('flex', {
              'justify-end': !!id,
              'hidden': !secondItem || isEdit,
            })}
          >
            <Typography
              variant={ETextVariant.sm}
              color={ETextColor.gray}
              className={classNames('absolute right-5 md:static', {'hidden': !secondItem || isEdit})}
            >
              {!!secondItem && !!secondItem.value && secondItem.value + '%'}
            </Typography>
            <ValidationTooltip
              id={id}
              field={secondItem?.validationField}
              validationData={validationData}
              messageProps={secondItem?.messageProps}
              hidden={!secondItem || isEdit}
              actions={actions}
            />
          </div>
        </>
        : <div className={classNames('flex items-center', {'md:justify-end sm:justify-end': isAbsolute})}>
          <Spinner size='small' className='w-8'/>
        </div>
      }
    </>
  );
};

export default EditedField;
