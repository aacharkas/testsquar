// fields name related to backend names
export const INSURANCE_CARRIER_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  FAX: 'fax',
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

export const DEFAULT_INSURANCE_CARRIER = {
  [INSURANCE_CARRIER_FIELDS.NAME]: false,
  [INSURANCE_CARRIER_FIELDS.FAX]: '',
  [INSURANCE_CARRIER_FIELDS.EMAIL]: '',
  [INSURANCE_CARRIER_FIELDS.PHONE]: '',
  // address fields
  [INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_STATE]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_CITY]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET_2]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_APARTMENT]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS]: '',
  [INSURANCE_CARRIER_FIELDS.ADDRESS_NAME]: '',
};

export const GOOGLE_OPTIONS = {
  componentRestrictions: { country: 'us' },
  fields: ['address_components', 'formatted_address', 'place_id', 'geometry'],
  types: [],
};

// API
export const INSURANCE_CARRIER_GET_API = 'insurance-carrier';
export const INSURANCE_CARRIER_CREATE_API = 'insurance-carrier';
export const INSURANCE_CARRIER_UPDATE_API = 'insurance-carrier';
export const INSURANCE_CARRIER_DELETE_API = 'insurance-carrier';
