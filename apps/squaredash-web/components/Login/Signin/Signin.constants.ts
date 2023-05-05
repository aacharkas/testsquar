// string part used to connect to backend
export const SIGNIN_FIELDS = {
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const DEFAULT_SIGNIN = {
  [SIGNIN_FIELDS.EMAIL]: '',
  [SIGNIN_FIELDS.PASSWORD]: '',
};

export const SIGNIN_API = 'auth/sign-in';
export const VERIFY_EMAIL_API = 'auth/verify-new-email';
export const CHANGE_EMAIL_API = 'auth/submit-change-email';
