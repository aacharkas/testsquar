import React from 'react';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextColor, ETextVariant} from '../../../../../../libs/web/constants/enums';
import {
  TEditedField,
  TImportDetailsData, TLoadingData, TValidationDataItem,
} from '../ImportDetails.types';
import {getAdjusterData} from './Summary.helper';
import classNames from 'classnames';
import Modal from '../../../../../../libs/web/components/Modal/Modal';
import {IMPORT_DETAILS_FIELDS} from '../ImportDetails.constants';
import Rows from './Rows';

interface IProps {
  t: any,
  data?: TImportDetailsData;
  onChange: (value, name: string, isPrice?: boolean, isDate?: boolean, id?: string) => void;
  isLast?: boolean;
  loading?: TLoadingData;
  modalLoading?: boolean;
  isVerified: boolean;
  editItem: TEditedField;
  setEditItem: (value: TEditedField) => void;
  validationData?: TValidationDataItem[];
  deleteAdjusterModal: boolean;
  setDeleteAdjusterModal: (value: boolean) => void;
  handleDeleteAdjuster: (id: string) => void;
  localErrorText: (text: string, field: string, object?: object) => string;
}


const SummaryAdjuster = ({
  t,
  data,
  onChange,
  isLast = true,
  loading,
  modalLoading,
  isVerified,
  editItem,
  setEditItem,
  validationData,
  deleteAdjusterModal,
  setDeleteAdjusterModal,
  handleDeleteAdjuster,
  localErrorText,
}: IProps): JSX.Element => {
  const adjusterData = getAdjusterData(data, t);

  return (
    <>
      <div className='relative'>
        <Rows
          rows={adjusterData}
          onChange={onChange}
          isVerified={isVerified}
          loading={loading}
          editItem={editItem}
          setEditItem={setEditItem}
          validationData={validationData}
          id={data[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_ID] as string}
        />
        <Typography
          variant={ETextVariant.xs}
          color={ETextColor.primary}
          medium
          className='cursor-pointer absolute top-0 right-[35%] md:right-0 sm:right-0'
          onClick={() => setDeleteAdjusterModal(true)}
        >
          {t('delete_adjuster')}
        </Typography>
      </div>
      {!isLast && <div className='my-5 border-b border-gray-300 max-w-[66%] md:max-w-[90%] sm:max-w-[85%]'/>}
      <Modal
        show={deleteAdjusterModal}
        closeModal={() => setDeleteAdjusterModal(false)}
        secondButtonAction={() => handleDeleteAdjuster(data?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_ID] as string)}
        firstButtonText={t('cancel')}
        secondButtonText={t('proceed')}
        loading={modalLoading}
      >
        <Typography variant={ETextVariant.lg} medium>
          {localErrorText('IM0013', 'adjuster', {name: data?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTER_NAME]})}
        </Typography>
      </Modal>
    </>
  );
};

export default SummaryAdjuster;
