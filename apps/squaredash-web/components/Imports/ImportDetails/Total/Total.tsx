import React from 'react';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {formatPrice} from '../../../../lib/formatPrice';
import {useTranslation} from 'next-i18next';
import {TEditedField, TImportDetailsData, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import {IMPORT_DETAILS_FIELDS, IMPORT_VALIDATION_FIELDS} from '../ImportDetails.constants';
import EditedField from '../EditedField/EditedField';

interface IProps {
  data: TImportDetailsData;
  validationData?: TValidationDataItem[];
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean) => void;
  loading?: TLoadingData;
  isVerified: boolean;
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
}

const Total = ({
  data,
  validationData,
  onChange,
  loading,
  isVerified,
  editItem,
  setEditItem,
}: IProps): JSX.Element => {
  const {t} = useTranslation('imports');
  return (
    <div className='mt-4 bg-white py-6 px-5 rounded-md sm:rounded-none'>
      <Typography variant={ETextVariant.lg} medium>
        {t('total')}
      </Typography>
      <div className='max-w-md mt-9'>
        <div className='flex justify-between mb-4 items-center'>
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>{t('line_item_total')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_LINE_ITEMS]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_LINE_ITEMS,
              validationField: IMPORT_VALIDATION_FIELDS.LINE_ITEMS_TOTAL_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='flex justify-between mb-4 items-center'>
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>{t('total_tax')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_TAX]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_TAX,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_TAX_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='flex justify-between mb-4 items-center'>
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>{t('total_op')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_OVERHEAD]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_OVERHEAD,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_OVERHEAD_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='flex justify-between items-center'>
          <Typography variant={ETextVariant.base} medium>{t('replacement_cost_value')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_RCV]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_RCV,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_RCV_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            fontSize={ETextVariant.lg}
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='my-4 border-b border-gray-300'/>
        <div className='flex justify-between mb-4 items-center'>
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>{t('depreciation')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_DEPRECIATION]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_DEPRECIATION,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_DEPRECIATION_SUM_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='flex justify-between items-center'>
          <Typography variant={ETextVariant.base} medium>{t('actual_cash_value')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_ACV]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_ACV,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_ACV_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            fontSize={ETextVariant.base}
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='my-4 border-b border-gray-300'/>
        <div className='flex justify-between items-center'>
          <Typography variant={ETextVariant.xl_2} color={ETextColor.primary} medium>{t('net_claim')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.NET_CLAIM_SUM]),
              name: IMPORT_DETAILS_FIELDS.NET_CLAIM_SUM,
              validationField: IMPORT_VALIDATION_FIELDS.NET_CLAIM_SUM_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            fontSize={ETextVariant.xl_2}
            color={ETextColor.primary}
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='my-4 border-b border-gray-300'/>
        <div className='flex justify-between mb-4 items-center'>
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>{t('deductible')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.DEDUCTIBLE]),
              name: IMPORT_DETAILS_FIELDS.DEDUCTIBLE,
              validationField: IMPORT_VALIDATION_FIELDS.DEDUCTIBLE_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='flex justify-between mb-4 items-center'>
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium>
            {t('recoverable_depreciation')}
          </Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_RECOVERABLE_DEPRECIATION_SUM]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_RECOVERABLE_DEPRECIATION_SUM,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_RECOVERABLE_DEPRECATION_SUM_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='flex justify-between items-center'>
          <Typography variant={ETextVariant.sm} color={ETextColor.gray} medium
            className='sm:max-w-[200px]'>{t('non_recoverable_depreciation')}</Typography>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.TOTAL_NON_RECOVERABLE_DEPRECIATION_SUM]),
              name: IMPORT_DETAILS_FIELDS.TOTAL_NON_RECOVERABLE_DEPRECIATION_SUM,
              validationField: IMPORT_VALIDATION_FIELDS.TOTAL_NONRECOVERABLE_DEPRECATION_SUM_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
        <div className='my-4 border-b border-gray-300'/>
        <div className='flex justify-between items-center'>
          <div className='sm:max-w-[200px]'>
            <Typography variant={ETextVariant.xl_2} color={ETextColor.primary} medium>{t('net_claim')}</Typography>
            <Typography variant={ETextVariant.base} color={ETextColor.primary} medium>
              {t('if_depreciation_is_recovered')}
            </Typography>
          </div>
          <EditedField
            item={{
              value: formatPrice(data[IMPORT_DETAILS_FIELDS.NET_CLAIM_IF_DEPRECIATION_IS_RECOVERED]),
              name: IMPORT_DETAILS_FIELDS.NET_CLAIM_IF_DEPRECIATION_IS_RECOVERED,
              validationField: IMPORT_VALIDATION_FIELDS.NET_CLAIM_IF_DEPRECATION_IS_RECOVERED_VALIDATE,
            }}
            onChange={onChange}
            inputClassName='max-w-[100px]'
            textClassName='min-w-[100px] flex justify-end'
            isPrice
            fontSize={ETextVariant.xl_2}
            color={ETextColor.primary}
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </div>
      </div>
    </div>
  );
};

export default Total;
