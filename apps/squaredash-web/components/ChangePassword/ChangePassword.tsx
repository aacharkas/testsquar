import { useTranslation } from 'next-i18next';
import React from 'react';

import Input from '../../../../libs/web/components/Input/Input';
import Typography from '../../../../libs/web/components/Typography/Typography';
import { ETextVariant } from '../../../../libs/web/constants/enums';
import { ErrorMessage } from '../Components/ErrorMessage';
import { CHANGE_PASSWORD_FIELDS } from './ChangePassword.constants';
import { TChangePassword, TChangePasswordErrors } from './ChangePassword.types';

interface IProps {
  loading: boolean;
  handleChange: (value: string, name: string) => void;
  changePasswordForm: TChangePassword;
  changePasswordFormErrors: TChangePasswordErrors;
  localErrorText: (text: string, field: string) => string;
}

export function ChangePassword({
  loading,
  handleChange,
  changePasswordForm,
  changePasswordFormErrors,
  localErrorText,
}: IProps) {
  const { t } = useTranslation(['buttons', 'system_errors']);

  return (
    <div className="relative">
      <div className="pb-10">
        <Typography variant={ETextVariant.lg} medium>
          {t('change_password')}
        </Typography>
      </div>
      <Input
        password
        label={t('current_password')}
        value={changePasswordForm[CHANGE_PASSWORD_FIELDS.OLD_PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, CHANGE_PASSWORD_FIELDS.OLD_PASSWORD)
        }
        className="mb-10"
        error={!!changePasswordFormErrors[CHANGE_PASSWORD_FIELDS.OLD_PASSWORD]}
        errorText={localErrorText(
          changePasswordFormErrors[CHANGE_PASSWORD_FIELDS.OLD_PASSWORD],
          CHANGE_PASSWORD_FIELDS.OLD_PASSWORD
        )}
        isDisabled={loading}
        maxLength={128}
      />
      <Input
        password
        label={t('new_password')}
        value={changePasswordForm[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(e.target.value, CHANGE_PASSWORD_FIELDS.NEW_PASSWORD)
        }
        className="mb-6"
        error={!!changePasswordFormErrors[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD]}
        errorText={localErrorText(
          changePasswordFormErrors[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD],
          CHANGE_PASSWORD_FIELDS.NEW_PASSWORD
        )}
        isDisabled={loading}
        maxLength={128}
      />
      <Input
        password
        label={t('confirm_password')}
        value={changePasswordForm[CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD]}
        onChangeText={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleChange(
            e.target.value,
            CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD
          )
        }
        className="mb-6"
        error={
          !!changePasswordFormErrors[
            CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD
          ]
        }
        errorText={localErrorText(
          changePasswordFormErrors[CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD],
          CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD
        )}
        isDisabled={loading}
        maxLength={128}
      />
      <ErrorMessage formError={changePasswordFormErrors} t={t} />
    </div>
  );
}

export default ChangePassword;
