export const USER_FIELDS = {
  ID: 'id',
  NAME: 'name',
  EMAIL: 'email',
  ROLE: 'role',
  STATUS: 'status',
  PHONE: 'phone',
  AVATAR: 'avatar',
  COMPANY_ID: 'companyId',
  ADDRESS_ID: 'addressId',
  BIRTH_DATE: 'birthDate',
  T_SHIRT_SIZE: 'tShirtSize',
  TECH_STATUS: 'techStatus',
  TIME_ZONE: 'timezone',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  LOOKED_AT: 'lockedAt',
  PERMISSIONS: 'permissions',
};

export const DEFAULT_USER = {
  [USER_FIELDS.ID]: '',
  [USER_FIELDS.NAME]: '',
  [USER_FIELDS.EMAIL]: '',
  [USER_FIELDS.ROLE]: '',
  [USER_FIELDS.STATUS]: '',
  [USER_FIELDS.AVATAR]: '',
  [USER_FIELDS.PHONE]: '',
  [USER_FIELDS.COMPANY_ID]: '',
  [USER_FIELDS.ADDRESS_ID]: '',
  [USER_FIELDS.BIRTH_DATE]: '',
  [USER_FIELDS.T_SHIRT_SIZE]: '',
  [USER_FIELDS.TECH_STATUS]: '',
  [USER_FIELDS.TIME_ZONE]: '',
  [USER_FIELDS.CREATED_AT]: '',
  [USER_FIELDS.UPDATED_AT]: '',
  [USER_FIELDS.LOOKED_AT]: '',
  [USER_FIELDS.PERMISSIONS]: null,
};

// API
export const LOGOUT_API = 'auth/sign-out';
export const GET_USER_API = 'user';

export const DEFAULT_IMAGE =
  'https://cdn-icons-png.flaticon.com/512/147/147144.png';
