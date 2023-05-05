// fields name related to backend names
export const LOCATION_FIELDS = {
  IS_MAIN_OFFICE: 'isMain',
  OFFICE_NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  COMPANY_ID: 'companyId',
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

export const DEFAULT_LOCATION = {
  [LOCATION_FIELDS.IS_MAIN_OFFICE]: false,
  [LOCATION_FIELDS.OFFICE_NAME]: '',
  [LOCATION_FIELDS.EMAIL]: '',
  [LOCATION_FIELDS.PHONE]: '',
  // address fields
  [LOCATION_FIELDS.ADDRESS_COUNTRY]: '',
  [LOCATION_FIELDS.ADDRESS_STATE]: '',
  [LOCATION_FIELDS.ADDRESS_CITY]: '',
  [LOCATION_FIELDS.ADDRESS_ZIP_CODE]: '',
  [LOCATION_FIELDS.ADDRESS_STREET]: '',
  [LOCATION_FIELDS.ADDRESS_STREET_2]: '',
  [LOCATION_FIELDS.ADDRESS_APARTMENT]: '',
  [LOCATION_FIELDS.ADDRESS_LATITUDE]: '',
  [LOCATION_FIELDS.ADDRESS_LONGITUDE]: '',
  [LOCATION_FIELDS.ADDRESS_PLACE_ID]: '',
  [LOCATION_FIELDS.ADDRESS]: '',
  [LOCATION_FIELDS.ADDRESS_NAME]: '',
};

export const GOOGLE_OPTIONS = {
  componentRestrictions: { country: 'us' },
  fields: ['address_components', 'formatted_address', 'place_id', 'geometry'],
  types: [],
};

export const LOCALISATION_INFO = { object: 'location' };

// API
export const LOCATION_GET_API = 'company/location';
export const LOCATION_CREATE_API = 'company/location';
export const LOCATION_UPDATE_API = 'company/location';
export const LOCATION_DELETE_API = 'company/location';

export enum LOCATION_ACTIONS {
  DELETE,
  EDIT,
}
