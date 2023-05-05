import Typography from '../../../../../../../libs/web/components/Typography/Typography';
import Modal from '../../../../../../../libs/web/components/Modal/Modal';
import CustomerForm from './CustomerForm';
import {ETextVariant} from '../../../../../../../libs/web/constants/enums';
import {TCustomerForm, TCustomerErrors} from './CustomerForm.types';
import {IMPORT_DETAILS_FIELDS} from '../../ImportDetails.constants';
import {
  CUSTOMER_FIELDS
} from '../../../../../../../apps/squaredash-web/components/Customers/Customer/CustomerForm.constants';

interface IProps {
  t: any;
  localActions: {
    setOpenCancelModal: (val: boolean) => void;
  };
  localState: {
    openModal: boolean;
    openCancelModal: boolean;
    customerForm: TCustomerForm;
    customerFormErrors: TCustomerErrors;
    loading: boolean;
  };
  handlers: {
    handleChange: (value, name: string) => void;
    handleCancelButton: () => void;
    handleCloseCancelModal: () => void;
    handleSubmitClick: () => void;
  };
  localErrorText: (text: string, field: string) => string;
}

const CreateCustomerModal = ({
  localState,
  localActions,
  handlers,
  t,
  localErrorText,
}: IProps) => {
  return (
    <Modal
      show={localState.openModal}
      closeModal={() => localActions.setOpenCancelModal(true)}
      firstButtonAction={() => localActions.setOpenCancelModal(true)}
      secondButtonAction={handlers.handleSubmitClick}
      firstButtonText={t('cancel')}
      secondButtonText={t('create')}
      fullScreenModal
    >
      <div>
        <Typography variant={ETextVariant.lg} medium className="sm:text-left sm:block sm:pt-1">
          {t('new_customer')}
        </Typography>
        <CustomerForm
          localState={localState}
          t={t}
          localErrorText={localErrorText}
          handlers={handlers}
        />
      </div>
    </Modal>
  );
};
export default CreateCustomerModal;
