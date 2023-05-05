// restruct get structure to form structure
import { CHANGE_PASSWORD_FIELDS } from '../ChangePassword.constants';
import { TChangePassword } from '../ChangePassword.types';

export const formatCreateData = (
  changePasswordForm: TChangePassword
): object => {
  return {
    [CHANGE_PASSWORD_FIELDS.OLD_PASSWORD]:
      changePasswordForm[CHANGE_PASSWORD_FIELDS.OLD_PASSWORD],
    [CHANGE_PASSWORD_FIELDS.NEW_PASSWORD]:
      changePasswordForm[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD],
  };
};

export const checkIsValid = (changePasswordForm: TChangePassword, t) => {
  const errors = {};
  if (!changePasswordForm[CHANGE_PASSWORD_FIELDS.OLD_PASSWORD].trim()) {
    errors[CHANGE_PASSWORD_FIELDS.OLD_PASSWORD] = t('IM0001', {
      ns: 'system_errors',
      component: 'current password',
    });
  }
  if (!changePasswordForm[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD].trim()) {
    errors[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD] = t('IM0001', {
      ns: 'system_errors',
      component: 'new password',
    });
  } else if (
    changePasswordForm[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD].length < 8
  ) {
    errors[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD] = t('IM0003', {
      ns: 'system_errors',
    });
  }
  if (!changePasswordForm[CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD].trim()) {
    errors[CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD] = t('IM0001', {
      ns: 'system_errors',
      component: 'new password',
    });
  } else if (
    changePasswordForm[CHANGE_PASSWORD_FIELDS.NEW_PASSWORD] !==
    changePasswordForm[CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD]
  ) {
    errors[CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD] = t('IM0007', {
      ns: 'system_errors',
    });
  }

  return errors;
};
