import React, {useState} from 'react';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import Rows from './Rows';
import {PlusIcon, XMarkIcon} from '@heroicons/react/24/outline';
import {
  IAdjuster,
  TEditedField,
  TImportDetailsData,
  TImportDetailsInsuranceCarrierData,
  TLoadingData,
  TValidationDataItem,
} from '../ImportDetails.types';
import {IMPORT_DETAILS_FIELDS, IMPORT_VALIDATION_FIELDS} from '../ImportDetails.constants';
import {getInsuranceCarrierData} from './Summary.helper';
import SummaryAdjuster from './SummaryAdjuster';
import {AsyncSelect} from '../../../../../../libs/web/components/Select/AsyncSelect';
import Button from '../../../../../../libs/web/components/Button/Button';
import {
  GET_INSURANCE_CARRIES
} from '../../../../../../apps/squaredash-web/components/InsuranceCarriers/InsureanceCarriers.api';
import classNames from 'classnames';
import styles from '../ImportDetails.module.css';
import ValidationTooltip from '../ValidationTooltip';

interface IItem {
  id: number;
  name: string;
}

interface IProps {
  t: any;
  isVerified: boolean;
  formattedData: {
    data: TImportDetailsData;
    modalLoading: boolean;
    existingInsuranceCarrier;
    validationData: TValidationDataItem[];
    insuranceCarrierFieldsLoading: TLoadingData;
    adjusterFieldsLoading: TLoadingData;
    importInsuranceCarrierData: TImportDetailsInsuranceCarrierData;
    existingInsuranceCarrierData: TImportDetailsInsuranceCarrierData;
  };
  handlers: {
    handleChangeInsuranceCarrierData: (value, name: string, isPrice?: boolean, isDate?: boolean) => void;
    handleChangeAdjusterData: (value, name: string, isPrice?: boolean, isDate?: boolean, id?: string) => void;
    handleDeleteAdjuster: () => void;
  };
  localState: {
    editItem: TEditedField;
    deleteAdjusterModal: boolean;
  };
  localActions: {
    setEditItem: (value: TEditedField) => void;
    setAddAdjusterModal: (value: boolean) => void;
    setDeleteAdjusterModal: (value: boolean) => void;
  };
  localErrorText: (text: string, field: string) => string;
}

const SummaryInsuranceCarrier = ({
  t,
  formattedData,
  handlers,
  isVerified,
  localState,
  localActions,
  localErrorText,
}: IProps): JSX.Element => {
  const insuranceCarrierData = formattedData?.importInsuranceCarrierData;
  const adjusters = insuranceCarrierData?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_ADJUSTERS] as IAdjuster[];
  const rows = getInsuranceCarrierData(insuranceCarrierData, t, formattedData?.existingInsuranceCarrierData);

  const [isEdit, onCloseEdit] = useState<boolean>(false);
  const [insuranceValue, setInsuranceValue] = useState({
    id: 0,
    name: insuranceCarrierData?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_NAME]
  });

  const actions = {
    secondButtonAction: (value) => handlers?.handleChangeInsuranceCarrierData(value?.attributeValue, value?.attribute),
  };

  return (
    <div className='mt-4 bg-white py-6 px-5 rounded-md'>
      <div className='flex justify-between'>
        <Typography variant={ETextVariant.lg} medium>
          {t('insurance_carrier')}
        </Typography>
        <Button
          theme="dark"
          onClick={() => {
            localActions?.setAddAdjusterModal(true);
          }}
        >
          <PlusIcon className="h-6 w-6 mr-2"/>
          <Typography variant={ETextVariant.sm} medium>
            {t('add_adjuster')}
          </Typography>
        </Button>
      </div>
      {!isEdit &&
        <div className="flex items-center mt-8">
          <Typography
            variant={ETextVariant.xl_2}
            medium
            onClick={() => {
              setInsuranceValue({id: 0, name: insuranceCarrierData?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_NAME]});
              onCloseEdit(true);
            }}>
            {insuranceCarrierData?.[IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_NAME] as string || '-'}
          </Typography>
          <ValidationTooltip
            field={IMPORT_VALIDATION_FIELDS.INSURANCE_CARRIER_NAME_VALIDATE}
            validationData={formattedData?.validationData}
            actions={actions}
          />
        </div>
      }
      {isEdit &&
        <div className='flex mt-8'>
          <div className='w-96'>
            <AsyncSelect
              variableName="search"
              responsePathToArray="insuranceCarriers"
              queryStructure={GET_INSURANCE_CARRIES}
              initialLoad
              value={(insuranceValue as IItem)}
              onChange={(e) => {
                setInsuranceValue(e);
                handlers?.handleChangeInsuranceCarrierData(e?.name, IMPORT_DETAILS_FIELDS.INSURANCE_CARRIER_NAME);
                onCloseEdit(false);
              }}
              numberRequestElements={10}
              withoutNew={true}
              addNew='Add'
              maxLength={200}
            />
          </div>
          <div
            className={classNames('flex items-center bg-white rounded-md ml-3 mt-[5px] z-[3] min-h-[40px] w-[36px] h-[20px]', styles['button-shadow'])}>
            <div className='p-2 hover:bg-gray-50 cursor-pointer' onClick={() => onCloseEdit(false)}>
              <XMarkIcon
                className="h-5 w-5 text-red-600"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      }
      <Rows
        rows={rows}
        onChange={handlers?.handleChangeInsuranceCarrierData}
        isVerified={isVerified}
        loading={formattedData?.insuranceCarrierFieldsLoading}
        editItem={localState?.editItem}
        setEditItem={localActions?.setEditItem}
        validationData={formattedData?.validationData}
        actions={actions}
      />
      {!!adjusters?.length &&
        <div className='my-5 border-b border-gray-300 max-w-[66%] md:max-w-[90%] sm:max-w-[85%]'/>}
      {
        !!adjusters?.length && adjusters?.map((item: IAdjuster, index) =>
          <SummaryAdjuster
            t={t}
            data={item}
            onChange={handlers?.handleChangeAdjusterData}
            key={index}
            isLast={index === adjusters.length - 1}
            loading={formattedData?.adjusterFieldsLoading}
            modalLoading={formattedData?.modalLoading}
            isVerified={isVerified}
            editItem={localState?.editItem}
            setEditItem={localActions?.setEditItem}
            validationData={formattedData?.validationData}
            deleteAdjusterModal={localState?.deleteAdjusterModal}
            setDeleteAdjusterModal={localActions?.setDeleteAdjusterModal}
            handleDeleteAdjuster={handlers.handleDeleteAdjuster}
            localErrorText={localErrorText}
          />
        )
      }
    </div>
  );
};

export default SummaryInsuranceCarrier;
