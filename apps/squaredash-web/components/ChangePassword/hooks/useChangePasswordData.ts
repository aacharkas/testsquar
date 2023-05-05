import { useMutation } from '@apollo/client';
import { useTranslation } from 'next-i18next';
import { useCallback, useState } from 'react';

import { captureSentryError } from '../../../../../libs/web/helpers/captureSentryError';
import { localIssueText } from '../../Components/ErrorMessage';
import { CHANGE_PASSWORD } from '../ChangePassword.api';
import { DEFAULT_CHANGE_PASSWORD } from '../ChangePassword.constants';
import {
  TChangePassword,
  TChangePasswordErrors,
} from '../ChangePassword.types';
import { checkIsValid, formatCreateData } from './useChangePasswordData.helper';

interface IProps {
  onSuccess: () => void;
  onClose?: () => void;
}

const useChangePasswordData = ({ onSuccess, onClose }: IProps) => {
  const { t } = useTranslation(['system_errors']);
  const [changePassword, { loading }] = useMutation(CHANGE_PASSWORD);

  const [changePasswordForm, setChangePasswordForm] = useState<TChangePassword>(
    DEFAULT_CHANGE_PASSWORD
  );
  const [changePasswordFormErrors, setChangePasswordFormErrors] =
    useState<TChangePasswordErrors>({});

  const handleChange = (value, name: string) => {
    handleErrorFix(name);
    const updateInfo = {
      ...changePasswordForm,
      [name]: value,
    };
    setChangePasswordForm(updateInfo);
  };

  const handleErrorFix = (name: string) => {
    if (changePasswordFormErrors?.[name]) {
      const { [name]: omitted, ...errors } = changePasswordFormErrors;
      setChangePasswordFormErrors(errors);
    }
  };

  const onFinishChangePassword = async () => {
    if (isValid() && !loading) {
      try {
        const formattedRequest = formatCreateData(changePasswordForm);
        const { data } = await changePassword({
          variables: { input: formattedRequest },
        });
        if (data) {
          if (onClose) {
            onClose();
            setChangePasswordForm(DEFAULT_CHANGE_PASSWORD);
          }
          onSuccess();
        }
      } catch (error) {
        captureSentryError(error);
        setChangePasswordFormErrors(error?.networkError?.message);
      }
    }
  };

  const isValid = (): boolean => {
    const errors = checkIsValid(changePasswordForm, t);
    setChangePasswordFormErrors(errors);
    return !Object.keys(errors).length;
  };

  const localErrorText = useCallback(
    (text: string, field: string): string =>
      localIssueText(text, t, { component: field }),
    [t]
  );

  return {
    handleChange,
    onFinishChangePassword,
    loading,
    changePasswordForm,
    changePasswordFormErrors,
    localErrorText,
  };
};

export { useChangePasswordData };
