import React from 'react';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import {IGroup, TEditedField, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import {formatPrice} from '../../../../lib/formatPrice';
import styles from '../ImportDetails.module.css';
import classNames from 'classnames';
import EditedField from '../EditedField/EditedField';
import {GROUP_FIELDS} from './Items.constants';
import {IMPORT_VALIDATION_FIELDS} from '../ImportDetails.constants';

interface IProps {
  item: IGroup;
  t: any;
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean, groupId?: string) => void;
  groupsLoading: TLoadingData;
  isVerified: boolean;
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
  validationData: TValidationDataItem[];
}


const ItemTableFooter = ({
  item,
  t,
  onChange,
  groupsLoading,
  isVerified,
  editItem,
  setEditItem,
  validationData,
}: IProps): JSX.Element => {
  return (
    <tfoot className={classNames('bg-gray-50', styles['shadow'])}>
      <tr>
        <td className="pr-4 py-0 text-right text-left hidden sm:table-cell">
          <Typography variant={ETextVariant.lg} medium>
            {t('total')}
          </Typography>
        </td>
        <td className="py-4 pl-3 pr-4 text-right hidden sm:table-cell"/>
        <td className="py-4 pl-3 pr-4 text-right hidden sm:table-cell"/>
        <td className="py-4 pl-3 pr-4 text-right hidden sm:table-cell"/>
      </tr>
      <tr>
        <td className="px-3 py-4 text-right md:hidden sm:hidden"/>
        <td className="py-4 pl-4 pr-3 text-sm sm:pl-0 sm:hidden">
          <Typography variant={ETextVariant.lg} medium>
            {t('total')}
          </Typography>
        </td>
        <td className="px-3 py-4 text-right sm:hidden"/>
        <td className="px-3 py-4 text-right md:hidden sm:hidden relative"/>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.totalTax),
              name: GROUP_FIELDS.GROUP_TOTAL_TAX,
              validationField: IMPORT_VALIDATION_FIELDS.GROUP_TOTAL_TAX_VALIDATE,
            }}
            label={t('tax')}
            onChange={onChange}
            isPrice
            id={item.id}
            isAbsolute
            isVerified={isVerified}
            loading={groupsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.overhead),
              name: GROUP_FIELDS.GROUP_TOTAL_OVERHEAD,
              validationField: IMPORT_VALIDATION_FIELDS.GROUP_TOTAL_OVERHEAD_VALIDATE,
            }}
            label={t('op')}
            onChange={onChange}
            isPrice
            id={item.id}
            isAbsolute
            isVerified={isVerified}
            loading={groupsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.totalRCV),
              name: GROUP_FIELDS.GROUP_TOTAL_RCV,
              validationField: IMPORT_VALIDATION_FIELDS.GROUP_TOTAL_RCV_VALIDATE,
            }}
            label={t('rcv')}
            onChange={onChange}
            isPrice
            id={item.id}
            isAbsolute
            isVerified={isVerified}
            loading={groupsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="px-3 py-4 text-right hidden sm:table-cell relative"/>
        <td className="py-4 pl-3 pr-4 text-right sm:hidden relative">
          <EditedField
            item={{
              value: formatPrice(item.depreciation),
              name: GROUP_FIELDS.GROUP_TOTAL_DEPRECIATION,
              validationField: IMPORT_VALIDATION_FIELDS.GROUP_TOTAL_DEPRECIATION_SUM_VALIDATE,
            }}
            label={t('dep')}
            onChange={onChange}
            isPrice
            id={item.id}
            isAbsolute
            isVerified={isVerified}
            loading={groupsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right sm:hidden relative">
          <EditedField
            item={{
              value: formatPrice(item.totalACV),
              name: GROUP_FIELDS.GROUP_TOTAL_ACV,
              validationField: IMPORT_VALIDATION_FIELDS.GROUP_TOTAL_ACV_VALIDATE,
            }}
            label={t('acv')}
            onChange={onChange}
            isPrice
            id={item.id}
            isAbsolute
            isVerified={isVerified}
            loading={groupsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
      </tr>
      <tr className='xl:hidden lg:hidden md:hidden relative'>
        <td className="py-4 pl-3 pr-4 text-right">
          <EditedField
            item={{
              value: formatPrice(item.depreciation),
              name: GROUP_FIELDS.GROUP_TOTAL_DEPRECIATION,
              validationField: IMPORT_VALIDATION_FIELDS.GROUP_TOTAL_DEPRECIATION_SUM_VALIDATE,
            }}
            label={t('dep')}
            onChange={onChange}
            isPrice
            id={item.id}
            isAbsolute
            isVerified={isVerified}
            loading={groupsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="py-4 pl-3 pr-4 text-right relative">
          <EditedField
            item={{
              value: formatPrice(item.totalACV),
              name: GROUP_FIELDS.GROUP_TOTAL_ACV,
              validationField: IMPORT_VALIDATION_FIELDS.GROUP_TOTAL_ACV_VALIDATE,
            }}
            label={t('acv')}
            onChange={onChange}
            isPrice
            id={item.id}
            isAbsolute
            isVerified={isVerified}
            loading={groupsLoading}
            editItem={editItem}
            setEditItem={setEditItem}
            validationData={validationData}
          />
        </td>
        <td className="px-3 py-4 text-right"/>
        <td className="px-3 py-4 text-right"/>
      </tr>
    </tfoot>
  );
};

export default ItemTableFooter;
