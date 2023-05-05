import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../constants/permissions';
import { ROLES as APP_ROLES } from '../../../constants/roles';
import { USER_STATUSES } from '../../../constants/userStatuses';

export const DATA_FORMAT = 'MM/DD/YYYY';

export const MEMBER_FIELDS = {
  FULL_NAME: 'name',
  ROLE: 'role',
  STATUS: 'status',
  EMAIL: 'email',
  PHONE: 'phone',
  TIME_ZONE: 'timezone',
  DATE_OF_BIRTH: 'birthDate',
  T_SHIRT_SIZE: 'tShirtSize',
  IMAGE: 'avatarId',
  IMAGE_LINK: 'avatar',
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

export const DEFAULT_MEMBER = {
  [MEMBER_FIELDS.FULL_NAME]: '',
  [MEMBER_FIELDS.ROLE]: null,
  [MEMBER_FIELDS.EMAIL]: '',
  [MEMBER_FIELDS.STATUS]: '',
  [MEMBER_FIELDS.PHONE]: null,
  [MEMBER_FIELDS.TIME_ZONE]: '',
  [MEMBER_FIELDS.DATE_OF_BIRTH]: '',
  [MEMBER_FIELDS.T_SHIRT_SIZE]: '',
  [MEMBER_FIELDS.IMAGE]: '',
  [MEMBER_FIELDS.IMAGE_LINK]: '',
  // address fields
  [MEMBER_FIELDS.ADDRESS_COUNTRY]: '',
  [MEMBER_FIELDS.ADDRESS_STATE]: '',
  [MEMBER_FIELDS.ADDRESS_CITY]: '',
  [MEMBER_FIELDS.ADDRESS_ZIP_CODE]: '',
  [MEMBER_FIELDS.ADDRESS_STREET]: '',
  [MEMBER_FIELDS.ADDRESS_STREET_2]: '',
  [MEMBER_FIELDS.ADDRESS_APARTMENT]: '',
  [MEMBER_FIELDS.ADDRESS_LATITUDE]: null,
  [MEMBER_FIELDS.ADDRESS_LONGITUDE]: null,
  [MEMBER_FIELDS.ADDRESS_PLACE_ID]: '',
  [MEMBER_FIELDS.ADDRESS]: '',
  [MEMBER_FIELDS.ADDRESS_NAME]: '',
};

export const GOOGLE_OPTIONS = {
  componentRestrictions: { country: 'us' },
  fields: ['address_components', 'formatted_address', 'place_id', 'geometry'],
  types: [],
};

export const ERROR_TEXT = 'Please fill in the ';

export const SIZES = [
  {
    name: 'Not selected',
    id: 0,
  },
  {
    name: 'XS',
    id: 1,
  },
  {
    name: 'S',
    id: 2,
  },
  {
    name: 'M',
    id: 3,
  },
  {
    name: 'L',
    id: 4,
  },
  {
    name: 'XL',
    id: 5,
  },
  {
    name: 'XXL',
    id: 6,
  },
  {
    name: 'XXXL',
    id: 7,
  },
];

export const SIZE_FIELDS = {
  'Not selected': '',
  XS: 'XS',
  S: 'S',
  M: 'M',
  L: 'L',
  XL: 'XL',
  XXL: 'XXL',
  XXXL: 'XXXL',
};

export const STATUSES = [
  { id: 1, name: 'Active', type: USER_STATUSES.ACTIVE },
  { id: 2, name: 'Inactive', type: USER_STATUSES.INACTIVE },
  { id: 3, name: 'Suspended', type: USER_STATUSES.SUSPENDED },
];

export const ROLES = [
  {
    id: 0,
    name: 'Member',
    type: APP_ROLES.COMPANY_USER,
    permitAct: PERMISSION_ACTIONS.SET,
    permitUsr: PERMISSIONS.COMPANY_USER,
  },
  {
    id: 1,
    name: 'Owner',
    type: APP_ROLES.COMPANY_OWNER,
    permitAct: PERMISSION_ACTIONS.SET,
    permitUsr: PERMISSIONS.COMPANY_OWNER,
  },
  {
    id: 2,
    name: 'Admin',
    type: APP_ROLES.COMPANY_ADMIN,
    permitAct: PERMISSION_ACTIONS.SET,
    permitUsr: PERMISSIONS.COMPANY_ADMIN,
  },
];

export const DEFAULT_USER_ROLES = {
  Member: APP_ROLES.COMPANY_USER,
  Admin: APP_ROLES.COMPANY_ADMIN,
  Owner: APP_ROLES.COMPANY_OWNER,
};

export const CURRENT_YEAR = String(new Date().getFullYear());

// API
export const INVITE_MEMBER_API = 'invitation/send';
