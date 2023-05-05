import React, {Dispatch, useState} from 'react';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import Rows from './Rows';
import {IMPORT_DETAILS_FIELDS, IMPORT_VALIDATION_FIELDS} from '../ImportDetails.constants';
import {getCustomerData} from './Summary.helper';
import useCustomerFormData from './CustomerForm/hooks/useCustomerFormData';
import {GET_CUSTOMERS} from '../../../Customers/Customers.api';
import {AsyncSelect} from '../../../../../../libs/web/components/Select/AsyncSelect';
import {XMarkIcon} from '@heroicons/react/24/outline';
import classNames from 'classnames';
import styles from '../ImportDetails.module.css';
import {TEditedField, TImportDetailsData, TLoadingData, TValidationDataItem} from '../ImportDetails.types';
import ValidationTooltip from '../ValidationTooltip';
import CreateCustomerModal from './CustomerForm/CreateCustomerModal';
import UseExistingModal from '../Modals/UseExistingModal';

interface IItem {
  id: number;
  name: string;
}

interface IProps {
  t: any;
  formattedData: {
    importCustomerData: TImportDetailsData;
    existingCustomerData: any;
    validationData: TValidationDataItem[];
    customerFieldsLoading: TLoadingData;
    modalLoading: boolean;
  };
  localState: {
    editItem: TEditedField;
    useExistingModal: {
      attribute: string;
      attributeName: string;
      attributeValue: string;
    };
  };
  localActions: {
    setEditItem: (value: TEditedField) => void;
    setUseExistingModal: (value: boolean) => void;
  }
  onChange: (value, name: string) => void;
  isVerified: boolean;
  setImportCustomerData: (val) => void;
  isOpenCustomer: boolean;
  setOpenCustomer: Dispatch<boolean>;
  verifyOnActionSuccess: boolean;
  verifyImport: () => void;
}


const SummaryCustomer = ({
  t,
  formattedData,
  localState,
  localActions,
  onChange,
  isVerified,
  setImportCustomerData,
  isOpenCustomer,
  setOpenCustomer,
  verifyOnActionSuccess,
  verifyImport,
}: IProps): JSX.Element => {
  const customerData = formattedData?.importCustomerData;
  const {
    customerState,
    customerActions,
    localErrorText,
    handlers
  } = useCustomerFormData({
    data: formattedData?.existingCustomerData,
    setImportCustomerData,
    isOpenCustomer, 
    setOpenCustomer,
    verifyOnActionSuccess,
    verifyImport,
  });
  const rows = getCustomerData(customerData, t, formattedData?.existingCustomerData);

  const [customerName, setCustomerName] = useState({
    id: 0,
    name: customerData?.[IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME]
  });
  const [isEdit, onCloseEdit] = useState(false);

  const onCustomerChange = (e) => {
    (e as unknown) !== 'no_options' && setImportCustomerData((prevState) => ({...prevState, ...{[IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME]: e?.name}}));
    setCustomerName(e);
    (e as unknown) !== 'no_options' && handlers.onFinishEdit(e);
    onCloseEdit(false);
  };

  const secondButtonAction = (value) => {
    if (value) {
      localActions.setUseExistingModal({...value, isCustomer: true});
    } else {
      onCloseEdit(true);
    }
  };

  const actions = {
    firstButtonAction: () => customerActions.setOpenModal(true),
    secondButtonAction: (value) => secondButtonAction(value),
  };

  return (
    <div className='mt-4 bg-white py-6 px-5 rounded-md'>
      <Typography variant={ETextVariant.lg} medium>
        {t('customer')}
      </Typography>
      {!isEdit &&
        <div
          className="flex items-center mt-8 cursor-pointer"
          onClick={() => {
            setCustomerName({id: 0, name: customerData?.[IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME]});
            onCloseEdit(true);
          }}
        >
          <Typography variant={ETextVariant.xl_2} medium>
            {customerData?.[IMPORT_DETAILS_FIELDS.CUSTOMER_DISPLAY_NAME] as string || '-'}
          </Typography>
          <ValidationTooltip
            field={IMPORT_VALIDATION_FIELDS.CUSTOMER_DISPLAY_NAME_VALIDATE}
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
              responsePathToArray="customers"
              queryStructure={GET_CUSTOMERS}
              initialLoad
              value={(customerName as IItem)}
              onChange={onCustomerChange}
              numberRequestElements={10}
              responseNameName={'displayName'}
              requestOptions={{
                category: '',
                companyId: rows[0]?.companyId,
              }}
              addNew={'Create new customer'}
              onClick={() => customerActions.setOpenModal(true)}
              loading={customerState?.loading}
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
        onChange={onChange}
        isVerified={isVerified}
        loading={formattedData?.customerFieldsLoading}
        editItem={localState?.editItem}
        setEditItem={localActions?.setEditItem}
        validationData={formattedData?.validationData}
        actions={actions}
      />
      <CreateCustomerModal
        localState={customerState}
        localActions={customerActions}
        handlers={handlers}
        t={t}
        localErrorText={localErrorText}
      />
      <UseExistingModal
        t={t}
        data={localState?.useExistingModal}
        hide={() => localActions.setUseExistingModal(false)}
        onChangeCustomer={onChange}
        loading={formattedData?.modalLoading}
      />
    </div>
  );
};

export default SummaryCustomer;
