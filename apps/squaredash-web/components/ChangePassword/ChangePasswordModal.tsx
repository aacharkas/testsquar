import { useTranslation } from 'next-i18next';
import React from 'react';

import Modal from '../../../../libs/web/components/Modal/Modal';
import ChangePassword from './ChangePassword';
import { useChangePasswordData } from './hooks/useChangePasswordData';

interface IProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ChangePasswordModal({ open, onClose, onSuccess }: IProps) {
  const { t } = useTranslation(['buttons', 'system_errors']);
  const {
    handleChange,
    onFinishChangePassword,
    loading,
    changePasswordForm,
    changePasswordFormErrors,
    localErrorText,
  } = useChangePasswordData({ onSuccess, onClose });

  return (
    <Modal
      show={open}
      loading={loading}
      closeModal={onClose}
      firstButtonText={t('cancel')}
      secondButtonText={t('change')}
      secondButtonAction={onFinishChangePassword}
      isDisabled={loading}
    >
      <ChangePassword
        loading={loading}
        handleChange={handleChange}
        changePasswordForm={changePasswordForm}
        changePasswordFormErrors={changePasswordFormErrors}
        localErrorText={localErrorText}
      />
    </Modal>
  );
}

export default ChangePasswordModal;
