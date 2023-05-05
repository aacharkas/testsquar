// fields name related to backend names
import { CUSTOMER_ROLE } from '../../../constants/roles';

export const CUSTOMER_FIELDS = {
  // general
  ID: 'id',
  FIRST_NAME: 'firstName',
  LAST_NAME: 'lastName',
  NAME: 'displayName',
  EMAIL: 'email',
  PHONE: 'phone',
  TYPE: 'type',
  PARENT_ID: 'parentId',
  RESPONSIBLE_MEMBER: 'responsibleMembers',
  RESPONSIBLE_MEMBER_IDS: 'responsibleMemberIds',
  CREATED_AT: 'createdAt',
  UPDATED_AT: 'updatedAt',
  NOTES: 'notes',
  PARENT: 'parent',
  IS_SUB_CUSTOMERS: 'isSubCustomers',
  SUB_CUSTOMERS: 'subCustomers',
  // billing
  BILLING_NAME: 'billingName',
  BILLING_ADDRESS_ID: 'billingAddressId',
  BILLING_ADDRESS: 'billingAddress',
  BILLING_ADDRESS_COUNTRY: 'billingAddress.country',
  BILLING_ADDRESS_STATE: 'billingAddress.state',
  BILLING_ADDRESS_CITY: 'billingAddress.city',
  BILLING_ADDRESS_ZIP_CODE: 'billingAddress.zipCode',
  BILLING_ADDRESS_STREET: 'billingAddress.streetAddress1',
  BILLING_ADDRESS_STREET_2: 'billingAddress.streetAddress2',
  BILLING_ADDRESS_APARTMENT: 'billingAddress.apartment',
  BILLING_ADDRESS_LATITUDE: 'billingAddress.latitude',
  BILLING_ADDRESS_LONGITUDE: 'billingAddress.longitude',
  BILLING_ADDRESS_PLACE_ID: 'billingAddress.placeId',
  BILLING_ADDRESS_NAME: 'billingAddress.formattedAddress',
  // address fields
  SHIPPING_NAME: 'shippingName',
  SHIPPING_ADDRESS_ID: 'shippingAddressId',
  SHIPPING_ADDRESS: 'shippingAddress',
  SHIPPING_ADDRESS_COUNTRY: 'shippingAddress.country',
  SHIPPING_ADDRESS_STATE: 'shippingAddress.state',
  SHIPPING_ADDRESS_CITY: 'shippingAddress.city',
  SHIPPING_ADDRESS_ZIP_CODE: 'shippingAddress.zipCode',
  SHIPPING_ADDRESS_STREET: 'shippingAddress.streetAddress1',
  SHIPPING_ADDRESS_STREET_2: 'shippingAddress.streetAddress2',
  SHIPPING_ADDRESS_APARTMENT: 'shippingAddress.apartment',
  SHIPPING_ADDRESS_LATITUDE: 'shippingAddress.latitude',
  SHIPPING_ADDRESS_LONGITUDE: 'shippingAddress.longitude',
  SHIPPING_ADDRESS_PLACE_ID: 'shippingAddress.placeId',
  SHIPPING_ADDRESS_NAME: 'shippingAddress.formattedAddress',
  // only to read error fields
  COUNTRY: 'country',
  STATE: 'state',
  CITY: 'city',
  ZIP_CODE: 'zipCode',
  STREET: 'streetAddress1',
  APARTMENT: 'apartment',
};

export const DEFAULT_CUSTOMER = {
  // general
  [CUSTOMER_FIELDS.ID]: '',
  [CUSTOMER_FIELDS.FIRST_NAME]: '',
  [CUSTOMER_FIELDS.LAST_NAME]: '',
  [CUSTOMER_FIELDS.NAME]: '',
  [CUSTOMER_FIELDS.EMAIL]: '',
  [CUSTOMER_FIELDS.PHONE]: '',
  [CUSTOMER_FIELDS.TYPE]: null,
  [CUSTOMER_FIELDS.PARENT_ID]: '',
  [CUSTOMER_FIELDS.RESPONSIBLE_MEMBER]: [{ id: '', name: '' }],
  [CUSTOMER_FIELDS.CREATED_AT]: '',
  [CUSTOMER_FIELDS.UPDATED_AT]: '',
  [CUSTOMER_FIELDS.NOTES]: '',
  [CUSTOMER_FIELDS.PARENT]: null,
  [CUSTOMER_FIELDS.SUB_CUSTOMERS]: [],
  [CUSTOMER_FIELDS.IS_SUB_CUSTOMERS]: false,
  // billing
  [CUSTOMER_FIELDS.BILLING_NAME]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_ID]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_COUNTRY]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_STATE]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_CITY]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_STREET]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_STREET_2]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_APARTMENT]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_LATITUDE]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_LONGITUDE]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_PLACE_ID]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS]: '',
  [CUSTOMER_FIELDS.BILLING_ADDRESS_NAME]: '',
  // address fields
  [CUSTOMER_FIELDS.SHIPPING_NAME]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_ID]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_COUNTRY]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STATE]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_CITY]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_ZIP_CODE]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STREET]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STREET_2]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_APARTMENT]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_LATITUDE]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_LONGITUDE]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_PLACE_ID]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS]: '',
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME]: '',
};

export const NEW_MEMBER_TEMPLATE = {
  id: '',
  name: '',
};

export const GOOGLE_OPTIONS = {
  componentRestrictions: { country: 'us' },
  fields: ['address_components', 'formatted_address', 'place_id', 'geometry'],
  types: [],
};

export const CUSTOMER_TYPES = [
  {
    id: 1,
    name: 'Individual',
    type: CUSTOMER_ROLE.INDIVIDUAL,
  },
  { id: 2, name: 'Business', type: CUSTOMER_ROLE.BUSINESS },
];

// API
export const CUSTOMER_API = 'customer';
