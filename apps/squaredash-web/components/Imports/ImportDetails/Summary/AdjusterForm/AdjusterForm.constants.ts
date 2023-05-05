import { ADJUSTERS_OPTIONS } from '../../ImportDetails.constants';

export const ADJUSTER_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  PHONE: 'phone',
  TYPE: 'type',

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
};

export const DEFAULT_ADJUSTER = {
  [ADJUSTER_FIELDS.NAME]: '',
  [ADJUSTER_FIELDS.EMAIL]: null,
  [ADJUSTER_FIELDS.PHONE]: null,
  [ADJUSTER_FIELDS.TYPE]: ADJUSTERS_OPTIONS[0],
  // address
  [ADJUSTER_FIELDS.ADDRESS_COUNTRY]: null,
  [ADJUSTER_FIELDS.ADDRESS_STATE]: null,
  [ADJUSTER_FIELDS.ADDRESS_CITY]: null,
  [ADJUSTER_FIELDS.ADDRESS_ZIP_CODE]: null,
  [ADJUSTER_FIELDS.ADDRESS_STREET]: null,
  [ADJUSTER_FIELDS.ADDRESS_STREET_2]: null,
  [ADJUSTER_FIELDS.ADDRESS_APARTMENT]: null,
  [ADJUSTER_FIELDS.ADDRESS_LATITUDE]: null,
  [ADJUSTER_FIELDS.ADDRESS_LONGITUDE]: null,
  [ADJUSTER_FIELDS.ADDRESS_PLACE_ID]: null,
  [ADJUSTER_FIELDS.ADDRESS_NAME]: null,
  [ADJUSTER_FIELDS.ADDRESS]: null,
};

export const GOOGLE_OPTIONS = {
  componentRestrictions: { country: 'us' },
  fields: ['address_components', 'formatted_address', 'place_id', 'geometry'],
  types: [],
};
