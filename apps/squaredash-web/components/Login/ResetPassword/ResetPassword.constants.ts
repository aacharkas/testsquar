// string part used to connect to backend
export const RESET_FIELDS = {
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirm_password',
};

export const DEFAULT_RESET = {
  [RESET_FIELDS.PASSWORD]: '',
  [RESET_FIELDS.CONFIRM_PASSWORD]: '',
};

export const RESET_API = 'auth/reset-password/recieve';
