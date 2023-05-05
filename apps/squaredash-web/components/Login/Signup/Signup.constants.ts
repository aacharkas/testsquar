// string part used to connect to backend
export const SIGNUP_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
};

export const DEFAULT_SIGNUP = {
  [SIGNUP_FIELDS.NAME]: '',
  [SIGNUP_FIELDS.EMAIL]: '',
  [SIGNUP_FIELDS.PASSWORD]: '',
};

export const SIGNUP_API = 'auth/sign-up';
