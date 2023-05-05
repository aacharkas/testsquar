// string part used to connect to backend

export const MEMBER_SIGNUP_FIELDS = {
  FULL_NAME: 'name',
  PASSWORD: 'password',
  CONFIRM_PASSWORD: 'confirmPassword',
  ROLE: 'role',
  EMAIL: 'email',
  PHONE: 'phone',
  TIME_ZONE: 'timeZone',
  DATE_OF_BIRTH: 'birthDate',
  T_SHIRT_SIZE: 'tShirtSize',
  IMAGE: 'IMAGE',
  IMAGE_LINK: 'IMAGE_LINK',
  TOKEN: 'invitationToken',
  // address fields
  ADDRESS_COUNTRY: 'country',
  ADDRESS_STATE: 'state',
  ADDRESS_CITY: 'city',
  ADDRESS_ZIP_CODE: 'zipCode',
  ADDRESS_STREET: 'streetAddress1',
  ADDRESS_STREET_2: 'streetAddress2',
  ADDRESS_APARTMENT: 'apartment',
  ADDRESS_LATITUDE: 'latitude',
  ADDRESS_LONGITUDE: 'longitude',
  ADDRESS_PLACE_ID: 'placeId',
  ADDRESS_NAME: 'formattedAddress',
  ADDRESS: 'address',
  ADDRESS_ID: 'id',
};

export const DEFAULT_MEMBER_SIGNUP = {
  [MEMBER_SIGNUP_FIELDS.FULL_NAME]: '',
  [MEMBER_SIGNUP_FIELDS.PASSWORD]: '',
  [MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD]: '',
  [MEMBER_SIGNUP_FIELDS.ROLE]: '',
  [MEMBER_SIGNUP_FIELDS.EMAIL]: '',
  [MEMBER_SIGNUP_FIELDS.PHONE]: '',
  [MEMBER_SIGNUP_FIELDS.TIME_ZONE]: '',
  [MEMBER_SIGNUP_FIELDS.DATE_OF_BIRTH]: '',
  [MEMBER_SIGNUP_FIELDS.T_SHIRT_SIZE]: '',
  [MEMBER_SIGNUP_FIELDS.IMAGE]: '',
  [MEMBER_SIGNUP_FIELDS.IMAGE_LINK]: '',
  [MEMBER_SIGNUP_FIELDS.TOKEN]: '',
  // address fields
  [MEMBER_SIGNUP_FIELDS.ADDRESS_COUNTRY]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_STATE]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_CITY]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_ZIP_CODE]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_STREET]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_STREET_2]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_APARTMENT]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_LATITUDE]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_LONGITUDE]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_PLACE_ID]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS]: '',
  [MEMBER_SIGNUP_FIELDS.ADDRESS_NAME]: '',
};

export const ACTIONS = {
  UPDATED: 'UPDATED',
  REDIRECT: 'REDIRECT',
};

export const RECIEVE_INVITE_API = 'invitation/recieve';
export const MEMBER_SIGNUP_API = 'auth/sign-up';
