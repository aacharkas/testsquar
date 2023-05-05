// string part used to connect to backend
export const FORGOT_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const DEFAULT_FORGOT = {
  [FORGOT_FIELDS.EMAIL]: '',
};

export const FORGOT_API = 'auth/reset-password/send';
