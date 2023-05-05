import React from 'react';
import {ETextVariant} from '../../../../../../libs/web/constants/enums';
import Typography from '../../../../../../libs/web/components/Typography/Typography';
import Modal from '../../../../../../libs/web/components/Modal/Modal';


interface IProps {
  t: any,
  deleteGroupModal: boolean,
  setDeleteGroupModal: (value: boolean) => void,
  handleDeleteGroup: () => void,
  loading: boolean,
}

const DeleteGroupModal = ({
  t,
  deleteGroupModal,
  setDeleteGroupModal,
  handleDeleteGroup,
  loading,
}: IProps): JSX.Element => {
  return (
    <Modal
      show={deleteGroupModal}
      closeModal={() => setDeleteGroupModal(false)}
      secondButtonAction={handleDeleteGroup}
      firstButtonText={t('cancel')}
      secondButtonText={t('delete')}
      loading={loading}
    >
      <Typography
        variant={ETextVariant.lg}
        medium
        className="sm:text-left sm:block"
      >
        {t('delete_group_warning')}
      </Typography>
    </Modal>
  );
};

export default DeleteGroupModal;
