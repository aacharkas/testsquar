import React from 'react';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant, ETooltipType} from '../../../../../../libs/web/constants/enums';
import Badge from '../../../../../../libs/web/components/Badge/Badge';
import Rows from './Rows';
import UploadedFile from './UploadedFile';
import {
  TDropdownFileItem,
  TEditedField,
  TImportDetailsData,
  TLoadingData,
  TValidationDataItem
} from '../ImportDetails.types';
import {IMPORT_DETAILS_FIELDS, IMPORT_VALIDATION_FIELDS} from '../ImportDetails.constants';
import {DEFAULT_STATUSES, STATUSES_LABELS} from '../../../../../../libs/web/constants/constants';
import classNames from 'classnames';
import {getGeneralInfoData} from './Summary.helper';
import EditedField from '../EditedField/EditedField';

interface IProps {
  t: any;
  data: TImportDetailsData;
  validationData: TValidationDataItem[];
  isVerified: boolean;
  onClickFileItem: (item: TDropdownFileItem) => void;
  onChange: (value, name: string) => void;
  loading?: TLoadingData;
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
}


const SummaryGeneralInfo = ({
  t,
  data,
  validationData,
  isVerified,
  onClickFileItem,
  onChange,
  loading,
  editItem,
  setEditItem,
}: IProps): JSX.Element => {
  const rows = getGeneralInfoData(data, t);

  return (
    <div className='mt-4 bg-white py-6 px-5 rounded-md sm:rounded-none'>
      <div className='relative'>
        <Typography variant={ETextVariant.lg} medium>
          {t('general_info')}
        </Typography>
        <div className='flex items-center mt-8 sm:block'>
          <Typography variant={ETextVariant.xl_2} color={ETextColor.primary} medium className='mr-2'>
            {t('claim_number')}:
          </Typography>
          <EditedField
            item={{
              value: data[IMPORT_DETAILS_FIELDS.CLAIM_NUMBER] as string,
              name: IMPORT_DETAILS_FIELDS.CLAIM_NUMBER,
              messageProps: {
                claimNumber: data[IMPORT_DETAILS_FIELDS.CLAIM_NUMBER],
                insuranceCarrier: data[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_NAME],
              },
              validationField: IMPORT_VALIDATION_FIELDS.CLAIM_NUMBER_VALIDATE,
              isRequired: true,
            }}
            onChange={onChange}
            fontSize={ETextVariant.xl_2}
            color={ETextColor.primary}
            isVerified={isVerified}
            loading={loading}
            editItem={editItem}
            setEditItem={setEditItem}
            maxLength={20}
            validationData={validationData}
          />
          <Badge
            status={DEFAULT_STATUSES[data[IMPORT_DETAILS_FIELDS.STATUS] as string]}
            className='ml-3 sm:ml-0'
          >
            {STATUSES_LABELS[data[IMPORT_DETAILS_FIELDS.STATUS] as string]}
          </Badge>
        </div>
        <Rows
          rows={rows}
          onChange={onChange}
          isVerified={isVerified}
          loading={loading}
          editItem={editItem}
          setEditItem={setEditItem}
          validationData={validationData}
        />
        <div className={classNames(
          'absolute md:static sm:static right-0 top-0 flex items-start flex-col md:mt-4 sm:mt-4',
          {
            'hidden sm:block': !isVerified
          }
        )}>
          <UploadedFile data={data} t={t} onClickFileItem={onClickFileItem}/>
        </div>
      </div>
    </div>
  );
};

export default SummaryGeneralInfo;
