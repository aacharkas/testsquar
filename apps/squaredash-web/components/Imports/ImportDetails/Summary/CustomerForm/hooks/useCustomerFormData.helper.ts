import { IItem } from '../../../../../../../../libs/web/components/Select/SelectControlled';
import { CUSTOMER_ROLE } from '../../../../../../constants/roles';
import {
  CUSTOMER_FIELDS,
  CUSTOMER_TYPES,
  NEW_MEMBER_TEMPLATE,
} from '../../../../../Customers/Customer/CustomerForm.constants';
import {
  TCustomerErrors,
  TCustomerForm,
  TCustomerGetResponse,
  TRelatedUser,
} from '../../../../../Customers/Customer/CustomerForm.types';

export const processGoogleAddress = (addressObject, name: string) => {
  const addressComponents = addressObject?.address_components ?? [];
  const location = addressObject?.geometry?.location;
  let zipCode, state, city, country, streetAddress1Name, streetAddress1Number;
  addressComponents.forEach((item) => {
    const types = item?.types ?? [];
    if (types.includes('locality')) {
      city = item?.long_name;
    } else if (types.includes('postal_code')) {
      zipCode = item?.long_name;
    } else if (types.includes('administrative_area_level_1')) {
      state = item?.long_name;
    } else if (types.includes('country')) {
      country = item?.long_name;
    } else if (types.includes('route')) {
      streetAddress1Name = item?.long_name;
    } else if (types.includes('street_number')) {
      streetAddress1Number = item?.long_name;
    }
  });
  return {
    [`${name}.formattedAddress`]: addressObject?.formatted_address,
    [`${name}.country`]: country,
    [`${name}.zipCode`]: zipCode,
    [`${name}.state`]: state,
    [`${name}.city`]: city,
    [`${name}.streetAddress1`]: `${streetAddress1Name} ${streetAddress1Number}`,
    [`${name}.placeId`]: addressObject?.place_id,
    [`${name}.latitude`]: location?.lat && location.lat(),
    [`${name}.longitude`]: location?.lng && location.lng(),
  };
};

export const checkCustomerFormError = (
  customerForm: TCustomerForm,
  formatError: (name: string, field: string) => string,
  t
): TCustomerErrors => {
  const errors = {};
  if (!customerForm[CUSTOMER_FIELDS.NAME])
    errors[CUSTOMER_FIELDS.NAME] = formatError('IM0001', 'Display name');
  if (!customerForm[CUSTOMER_FIELDS.FIRST_NAME])
    errors[CUSTOMER_FIELDS.FIRST_NAME] = formatError('IM0001', 'First name');
  if (!customerForm[CUSTOMER_FIELDS.LAST_NAME])
    errors[CUSTOMER_FIELDS.LAST_NAME] = formatError('IM0001', 'Last name');
  if (!customerForm[CUSTOMER_FIELDS.EMAIL])
    errors[CUSTOMER_FIELDS.EMAIL] = formatError(
      'IM0001',
      CUSTOMER_FIELDS.EMAIL
    );
  if (!customerForm[CUSTOMER_FIELDS.PHONE])
    errors[CUSTOMER_FIELDS.PHONE] = formatError(
      'IM0001',
      CUSTOMER_FIELDS.PHONE
    );
  if (!(customerForm[CUSTOMER_FIELDS.TYPE] as IItem)?.type)
    errors[CUSTOMER_FIELDS.TYPE] = formatError('IM0001', CUSTOMER_FIELDS.TYPE);

  // billing
  if (!customerForm[CUSTOMER_FIELDS.BILLING_NAME])
    errors[CUSTOMER_FIELDS.BILLING_NAME] = formatError('IM0001', 'Name');
  if (!customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_NAME])
    errors[CUSTOMER_FIELDS.BILLING_ADDRESS_NAME] = formatError(
      'IM0001',
      'Street address'
    );
  if (!customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_CITY])
    errors[CUSTOMER_FIELDS.STATE] = formatError('IM0027', 'City');
  if (!customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_STATE])
    errors[CUSTOMER_FIELDS.STATE] = formatError('IM0027', 'State');
  if (!customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE])
    errors[CUSTOMER_FIELDS.ZIP_CODE] = formatError('IM0027', 'Zip Code');

  if (Object.keys(errors).length) {
    errors['common_issue'] = true;
    errors['common_text'] = t('fill_form');
  }
  return errors;
};

// restruct get structure to form structure
export const formatGetData = (
  customerForm: TCustomerGetResponse
): TCustomerForm => {
  const shippingAddress = customerForm?.shippingAddress;
  return {
    [CUSTOMER_FIELDS.ID]: customerForm?.id,
    [CUSTOMER_FIELDS.FIRST_NAME]: customerForm?.firstName,
    [CUSTOMER_FIELDS.LAST_NAME]: customerForm?.lastName,
    [CUSTOMER_FIELDS.NAME]: customerForm?.displayName,
    [CUSTOMER_FIELDS.EMAIL]: customerForm?.email,
    [CUSTOMER_FIELDS.PHONE]: customerForm?.phone,
    [CUSTOMER_FIELDS.TYPE]:
      CUSTOMER_TYPES.find((type) => type?.type === customerForm?.type) ??
      CUSTOMER_TYPES[0],
    [CUSTOMER_FIELDS.CREATED_AT]: customerForm?.createdAt,
    [CUSTOMER_FIELDS.UPDATED_AT]: customerForm?.updatedAt,
    // Billing Address
    [CUSTOMER_FIELDS.BILLING_NAME]: customerForm?.shippingName,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_ID]: customerForm?.shippingAddressId,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_COUNTRY]: shippingAddress?.country,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_STATE]: shippingAddress?.state,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_CITY]: shippingAddress?.city,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE]: shippingAddress?.zipCode,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_STREET]: shippingAddress?.streetAddress1,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_STREET_2]: shippingAddress?.streetAddress2,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_APARTMENT]: shippingAddress?.apartment,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_LATITUDE]: shippingAddress?.latitude,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_LONGITUDE]: shippingAddress?.longitude,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_PLACE_ID]: shippingAddress?.placeId,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_NAME]: shippingAddress?.formattedAddress,
  };
};

const collectBasicAddress = (
  customerForm: TCustomerForm,
  name: string
): object => {
  return {
    country: customerForm[`${name}.country`],
    state: customerForm[`${name}.state`],
    city: customerForm[`${name}.city`],
    zipCode: customerForm[`${name}.zipCode`],
    streetAddress1: customerForm[`${name}.streetAddress1`],
    streetAddress2: customerForm[`${name}.streetAddress2`],
    apartment: customerForm[`${name}.apartment`],
    latitude: customerForm[`${name}.latitude`],
    longitude: customerForm[`${name}.longitude`],
    placeId: customerForm[`${name}.placeId`],
    formattedAddress: customerForm[`${name}.formattedAddress`],
  };
};

// restruct get structure to form structure
export const formatCreateData = (customerForm: TCustomerForm) => {
  const billingAddress = collectBasicAddress(
    customerForm,
    CUSTOMER_FIELDS.BILLING_ADDRESS
  );
  const createObject = {
    type: (customerForm[CUSTOMER_FIELDS.TYPE] as IItem)?.type,
    firstName: customerForm[CUSTOMER_FIELDS.FIRST_NAME],
    lastName: customerForm[CUSTOMER_FIELDS.LAST_NAME],
    displayName: customerForm[CUSTOMER_FIELDS.NAME],
    phoneNumber: customerForm[CUSTOMER_FIELDS.PHONE],
    email: customerForm[CUSTOMER_FIELDS.EMAIL],
    shippingInformation: {
      name: customerForm[CUSTOMER_FIELDS.BILLING_NAME],
      address: billingAddress,
    },
    billingInformation: {
      name: customerForm[CUSTOMER_FIELDS.BILLING_NAME],
      address: billingAddress,
    },
  };
  return createObject;
};

export const copyBillingAddressToShipping = (customerForm: TCustomerForm) => ({
  [CUSTOMER_FIELDS.SHIPPING_NAME]: customerForm[CUSTOMER_FIELDS.BILLING_NAME],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_COUNTRY]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_COUNTRY],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STATE]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_STATE],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_CITY]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_CITY],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_ZIP_CODE]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STREET]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_STREET],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STREET_2]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_STREET_2],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_APARTMENT]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_APARTMENT],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_LATITUDE]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_LATITUDE],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_LONGITUDE]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_LONGITUDE],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_PLACE_ID]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_PLACE_ID],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS],
  [CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME]:
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_NAME],
});

export const handleChangeFormatter = (
  name: string,
  value,
  customerForm,
  handleErrorFix
) => {
  let updateInfo = {
    [name]: value,
  };
  if (
    [
      CUSTOMER_FIELDS.SHIPPING_ADDRESS,
      CUSTOMER_FIELDS.BILLING_ADDRESS,
    ].includes(name)
  ) {
    updateInfo = {
      ...updateInfo,
      ...processGoogleAddress(value, name),
    };
  } else if (name === CUSTOMER_FIELDS.RESPONSIBLE_MEMBER) {
    handleErrorFix(CUSTOMER_FIELDS.RESPONSIBLE_MEMBER_IDS);
  } else if (
    [CUSTOMER_FIELDS.FIRST_NAME, CUSTOMER_FIELDS.LAST_NAME].includes(name) &&
    customerForm[CUSTOMER_FIELDS.TYPE]?.type === CUSTOMER_ROLE.INDIVIDUAL
  ) {
    if (name === CUSTOMER_FIELDS.FIRST_NAME) {
      updateInfo = {
        ...updateInfo,
        [CUSTOMER_FIELDS.NAME]: `${value} ${
          customerForm[CUSTOMER_FIELDS.LAST_NAME] || ''
        }`,
      };
    } else if (name === CUSTOMER_FIELDS.LAST_NAME) {
      updateInfo = {
        ...updateInfo,
        [CUSTOMER_FIELDS.NAME]: `${
          customerForm[CUSTOMER_FIELDS.FIRST_NAME] || ''
        } ${value}`,
      };
    }
  } else if (name === CUSTOMER_FIELDS.IS_SUB_CUSTOMERS) {
    updateInfo = {
      ...updateInfo,
      [CUSTOMER_FIELDS.PARENT]: null,
    };
  }

  if (updateInfo[CUSTOMER_FIELDS.NAME]) {
    updateInfo = {
      ...updateInfo,
      [CUSTOMER_FIELDS.BILLING_NAME]: updateInfo[CUSTOMER_FIELDS.NAME],
      [CUSTOMER_FIELDS.SHIPPING_NAME]: updateInfo[CUSTOMER_FIELDS.NAME],
    };
  }

  return updateInfo;
};
