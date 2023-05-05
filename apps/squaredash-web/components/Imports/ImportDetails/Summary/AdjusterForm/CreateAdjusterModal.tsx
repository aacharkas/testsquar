import Typography from '../../../../../../../libs/web/components/Typography/Typography';
import Modal from '../../../../../../../libs/web/components/Modal/Modal';
import {ETextVariant} from '../../../../../../../libs/web/constants/enums';
import AdjusterForm from './AdjusterForm';
import useAdjusterData from './hooks/useAdjusterData';
import {useTranslation} from 'next-i18next';

interface IProps {
  addAdjusterModal: boolean;
  setAddAdjusterModal: (value: boolean) => void;
  carrierId: string;
}

const CreateAdjusterModal = ({
  addAdjusterModal,
  setAddAdjusterModal,
  carrierId,
}: IProps) => {
  const {
    localState,
    localActions,
    handlers,
    adjusterFormErrors,
    adjusterForm,
    localErrorText,
    formattedData,
  } = useAdjusterData({setAddAdjusterModal, carrierId});
  const {t} = useTranslation(['imports', 'system_errors']);

  return (
    <Modal
      show={addAdjusterModal}
      closeModal={() => localActions.setOpenCancelModal(true)}
      firstButtonAction={() => localActions.setOpenCancelModal(true)}
      secondButtonAction={handlers.handleSubmitClick}
      firstButtonText={t('cancel')}
      secondButtonText={t('add')}
      fullScreenModal
    >
      <Typography variant={ETextVariant.lg} medium className="sm:text-left sm:block sm:pt-1">
        {t('add_adjuster')}
      </Typography>
      <AdjusterForm
        t={t}
        localState={localState}
        handlers={handlers}
        adjusterFormErrors={adjusterFormErrors}
        adjusterForm={adjusterForm}
        localErrorText={localErrorText}
        formattedData={formattedData}
      />
    </Modal>
  );
};
export default CreateAdjusterModal;
