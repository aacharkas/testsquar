// string part used to connect to backend
export const CHANGE_PASSWORD_FIELDS = {
  OLD_PASSWORD: 'oldPassword',
  NEW_PASSWORD: 'newPassword',
  CONFIRM_NEW_PASSWORD: 'confirmNewPassword',
};

export const DEFAULT_CHANGE_PASSWORD = {
  [CHANGE_PASSWORD_FIELDS.OLD_PASSWORD]: '',
  [CHANGE_PASSWORD_FIELDS.NEW_PASSWORD]: '',
  [CHANGE_PASSWORD_FIELDS.CONFIRM_NEW_PASSWORD]: '',
};

export const CHANGE_PASSWORD_API = 'user/change-password';

export const SMALL_SCREEN_SIZE = 550;
