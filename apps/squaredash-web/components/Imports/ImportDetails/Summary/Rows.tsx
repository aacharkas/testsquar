import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import React from 'react';
import EditedField from '../EditedField/EditedField';
import {TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import {IItem} from '../../../../../../libs/web/components/Select/SelectControlled';

interface IProps {
  rows: {
    title: string;
    value: string;
    name: string;
    messageProps?: any;
    isDate?: boolean;
    isPhone?: boolean;
    isAddress?: boolean;
    maxLength?: number;
    selectOptions?: IItem[];
  }[];
  validationData?: TValidationDataItem[];
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean, id?: string) => void;
  isVerified: boolean;
  loading: TLoadingData;
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
  id?: string;
  actions?: {
    firstButtonAction?: () => void;
    secondButtonAction?: (value) => void;
  };
}

const Rows = ({
  rows,
  validationData,
  onChange,
  isVerified,
  loading,
  editItem,
  setEditItem,
  id,
  actions,
}: IProps): JSX.Element => {
  return (
    <div className='grid mt-6 grid-cols-3 md:grid-cols-2 sm:block'>
      <div>
        {rows?.slice(0, (rows.length + 1) / 2).map((item, index) =>
          <div key={index} className='mb-4 max-w-[275px] last:mb-0 sm:last:mb-4'>
            <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium className='mb-1'>
              {item.title}:
            </Typography>
            <EditedField
              item={item}
              onChange={onChange}
              inputClassName='min-w-[275px]'
              isDate={item.isDate}
              isPhone={item.isPhone}
              isAddress={item.isAddress}
              isVerified={isVerified}
              loading={loading}
              editItem={editItem}
              setEditItem={setEditItem}
              maxLength={item.maxLength}
              validationData={validationData}
              isSelect={!!item.selectOptions}
              selectOptions={item.selectOptions}
              id={id}
              actions={actions}
            />
          </div>
        )}
      </div>
      <div>
        {rows?.slice((rows.length + 1) / 2).map((item, index) =>
          <div key={index} className='mb-4 max-w-[275px] last:mb-0'>
            <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium className='mb-1'>
              {item.title}:
            </Typography>
            <EditedField
              item={item}
              onChange={onChange}
              inputClassName='min-w-[275px]'
              isDate={item.isDate}
              isPhone={item.isPhone}
              isAddress={item.isAddress}
              isVerified={isVerified}
              loading={loading}
              editItem={editItem}
              setEditItem={setEditItem}
              maxLength={item.maxLength}
              validationData={validationData}
              id={id}
              actions={actions}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Rows;
