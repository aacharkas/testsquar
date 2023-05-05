import React, {Dispatch} from 'react';
import SummaryGeneralInfo from './SummaryGeneralInfo';
import SummaryCustomer from './SummaryCustomer';
import SummaryInsuranceCarrier from './SummaryInsuranceCarrier';
import {useTranslation} from 'next-i18next';
import CreateAdjusterModal from './AdjusterForm/CreateAdjusterModal';
import UseExistingModal from '../Modals/UseExistingModal';

interface IProps {
  formattedData: any;
  isVerified: boolean;
  onClickFileItem: (item) => void;
  handlers: any;
  setImportCustomerData: (val) => void;
  localState: any;
  localActions: any;
  localErrorText: (text: string, field: string) => string;
  isOpenCustomer: boolean;
  setOpenCustomer: Dispatch<boolean>;
  verifyOnActionSuccess: boolean;
}


const Summary = ({
  formattedData,
  isVerified,
  onClickFileItem,
  handlers,
  setImportCustomerData,
  localState,
  localActions,
  localErrorText,
  isOpenCustomer,
  setOpenCustomer,
  verifyOnActionSuccess,
}: IProps): JSX.Element => {
  const {t} = useTranslation('imports');

  return (
    <div>
      <SummaryGeneralInfo
        t={t}
        data={formattedData.importDetailsData}
        validationData={formattedData.validationData}
        isVerified={isVerified}
        onClickFileItem={onClickFileItem}
        onChange={handlers.handleChangeGeneralData}
        loading={formattedData.generalFieldsLoading}
        editItem={localState.editItem}
        setEditItem={localActions.setEditItem}
      />
      <SummaryCustomer
        t={t}
        formattedData={formattedData}
        localState={localState}
        localActions={localActions}
        onChange={handlers.handleChangeCustomerData}
        isVerified={isVerified}
        setImportCustomerData={setImportCustomerData}
        isOpenCustomer={isOpenCustomer}
        setOpenCustomer={setOpenCustomer}
        verifyOnActionSuccess={verifyOnActionSuccess}
        verifyImport={handlers.verifyImportAction}
      />
      <SummaryInsuranceCarrier
        t={t}
        formattedData={formattedData}
        handlers={handlers}
        isVerified={isVerified}
        localState={localState}
        localActions={localActions}
        localErrorText={localErrorText}
      />
      <CreateAdjusterModal
        addAdjusterModal={localState.addAdjusterModal}
        setAddAdjusterModal={localActions.setAddAdjusterModal}
        carrierId={formattedData?.importInsuranceCarrierData?.id}
      />
    </div>
  );
};

export default Summary;
