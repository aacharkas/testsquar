import { IItem } from '../../../../../../libs/web/components/Select/SelectControlled';
import { CUSTOMER_ROLE } from '../../../../constants/roles';
import {
  CUSTOMER_FIELDS,
  CUSTOMER_TYPES,
  NEW_MEMBER_TEMPLATE,
} from '../CustomerForm.constants';
import type { TCustomerForm } from '../CustomerForm.types';
import {
  TCustomerErrors,
  TCustomerGetResponse,
  TRelatedUser,
} from '../CustomerForm.types';

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
  if (
    !(
      Array.isArray(customerForm[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER]) &&
      (customerForm?.[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER] as TRelatedUser[])
        ?.length
    )
  ) {
    errors[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER_IDS] = formatError(
      'IM0001',
      'Responsible member'
    );
  } else if (
    !(
      customerForm[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER][0]?.id &&
      customerForm[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER][0]?.name
    )
  )
    errors[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER] = formatError(
      'IM0001',
      'Responsible member'
    );
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
  // shipping
  // billing
  if (!customerForm[CUSTOMER_FIELDS.SHIPPING_NAME])
    errors[CUSTOMER_FIELDS.SHIPPING_NAME] = formatError('IM0001', 'Name');
  if (!customerForm[CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME])
    errors[CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME] = formatError(
      'IM0001',
      'Street address'
    );
  if (!customerForm[CUSTOMER_FIELDS.SHIPPING_ADDRESS_CITY])
    errors[CUSTOMER_FIELDS.CITY] = formatError('IM0027', 'City');
  if (!customerForm[CUSTOMER_FIELDS.SHIPPING_ADDRESS_STATE])
    errors[CUSTOMER_FIELDS.STATE] = formatError('IM0027', 'State');
  if (!customerForm[CUSTOMER_FIELDS.SHIPPING_ADDRESS_ZIP_CODE])
    errors[CUSTOMER_FIELDS.ZIP_CODE] = formatError('IM0027', 'Zip Code');
  if (
    customerForm[CUSTOMER_FIELDS.IS_SUB_CUSTOMERS] &&
    !customerForm[CUSTOMER_FIELDS.PARENT]
  ) {
    errors[CUSTOMER_FIELDS.PARENT] = formatError('IM0044-1', 'Parent');
  }
  if (Object.keys(errors).length) {
    errors['common_issue'] = true;
    errors['common_text'] = t('fill_form');
  }
  return errors;
};

// restruct get structure to form structure
export const formatGetData = (
  customerForm: TCustomerGetResponse,
  userAsMember
): TCustomerForm => {
  const billingAddress = customerForm?.billingAddress;
  const shippingAddress = customerForm?.shippingAddress;
  const responsibleMembers = customerForm?.responsibleMembers ?? [
    userAsMember ?? NEW_MEMBER_TEMPLATE,
  ];
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
    [CUSTOMER_FIELDS.PARENT_ID]: customerForm?.parentId,
    [CUSTOMER_FIELDS.RESPONSIBLE_MEMBER]: responsibleMembers,
    [CUSTOMER_FIELDS.CREATED_AT]: customerForm?.createdAt,
    [CUSTOMER_FIELDS.UPDATED_AT]: customerForm?.updatedAt,
    [CUSTOMER_FIELDS.NOTES]: customerForm?.notes,
    [CUSTOMER_FIELDS.PARENT]: customerForm?.parent,
    [CUSTOMER_FIELDS.IS_SUB_CUSTOMERS]: !!customerForm?.parent,
    [CUSTOMER_FIELDS.SUB_CUSTOMERS]: customerForm?.subCustomers,
    // Billing Address
    [CUSTOMER_FIELDS.BILLING_NAME]: customerForm?.billingName,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_ID]: customerForm?.billingAddressId,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_COUNTRY]: billingAddress?.country,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_STATE]: billingAddress?.state,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_CITY]: billingAddress?.city,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_ZIP_CODE]: billingAddress?.zipCode,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_STREET]: billingAddress?.streetAddress1,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_STREET_2]: billingAddress?.streetAddress2,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_APARTMENT]: billingAddress?.apartment,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_LATITUDE]: billingAddress?.latitude,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_LONGITUDE]: billingAddress?.longitude,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_PLACE_ID]: billingAddress?.placeId,
    [CUSTOMER_FIELDS.BILLING_ADDRESS_NAME]: billingAddress?.formattedAddress,
    // Shipping Address
    [CUSTOMER_FIELDS.SHIPPING_NAME]: customerForm?.shippingName,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_ID]: customerForm?.shippingAddressId,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_COUNTRY]: shippingAddress?.country,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STATE]: shippingAddress?.state,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_CITY]: shippingAddress?.city,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_ZIP_CODE]: shippingAddress?.zipCode,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STREET]: shippingAddress?.streetAddress1,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_STREET_2]:
      shippingAddress?.streetAddress2,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_APARTMENT]: shippingAddress?.apartment,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_LATITUDE]: shippingAddress?.latitude,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_LONGITUDE]: shippingAddress?.longitude,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_PLACE_ID]: shippingAddress?.placeId,
    [CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME]: shippingAddress?.formattedAddress,
  };
};

export const formatEditData = (
  originalCustomer: TCustomerGetResponse,
  customerForm: TCustomerForm
): object => {
  const editResult = {};
  const compareMainValues = (
    originalName: string,
    name: string,
    predefinedValue?: any
  ): void => {
    if (
      originalCustomer[originalName] !== (predefinedValue || customerForm[name])
    ) {
      editResult[originalName] = predefinedValue || customerForm[name];
    }
  };

  compareMainValues('firstName', CUSTOMER_FIELDS.FIRST_NAME);
  compareMainValues('lastName', CUSTOMER_FIELDS.LAST_NAME);
  compareMainValues('displayName', CUSTOMER_FIELDS.NAME);
  compareMainValues('phone', CUSTOMER_FIELDS.PHONE);
  compareMainValues('email', CUSTOMER_FIELDS.EMAIL);
  compareMainValues('notes', CUSTOMER_FIELDS.NOTES);
  compareMainValues(
    'parentId',
    CUSTOMER_FIELDS.PARENT,
    (customerForm[CUSTOMER_FIELDS.PARENT] as TRelatedUser)?.id
  );
  compareMainValues(
    'responsibleMemberIds',
    CUSTOMER_FIELDS.RESPONSIBLE_MEMBER,
    (customerForm[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER] as TRelatedUser[]).map(
      (member) => member?.id
    )
  );

  if (
    (customerForm[CUSTOMER_FIELDS.TYPE] as IItem)?.type ||
    originalCustomer?.type
  ) {
    editResult['type'] = (customerForm[CUSTOMER_FIELDS.TYPE] as IItem)?.type;
  }

  compareMainValues('shippingName', CUSTOMER_FIELDS.SHIPPING_NAME);
  if (
    customerForm[CUSTOMER_FIELDS.SHIPPING_ADDRESS_NAME] ||
    originalCustomer?.shippingAddress
  ) {
    editResult['shippingAddress'] = collectBasicAddress(
      customerForm,
      CUSTOMER_FIELDS.SHIPPING_ADDRESS
    );
  }

  compareMainValues('billingName', CUSTOMER_FIELDS.BILLING_NAME);
  if (
    customerForm[CUSTOMER_FIELDS.BILLING_ADDRESS_NAME] ||
    originalCustomer?.billingAddress
  ) {
    editResult['billingAddress'] = collectBasicAddress(
      customerForm,
      CUSTOMER_FIELDS.BILLING_ADDRESS
    );
  }

  return editResult;
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
  const shippingAddress = collectBasicAddress(
    customerForm,
    CUSTOMER_FIELDS.SHIPPING_ADDRESS
  );
  const createObject = {
    type: (customerForm[CUSTOMER_FIELDS.TYPE] as IItem)?.type,
    firstName: customerForm[CUSTOMER_FIELDS.FIRST_NAME],
    lastName: customerForm[CUSTOMER_FIELDS.LAST_NAME],
    displayName: customerForm[CUSTOMER_FIELDS.NAME],
    phone: customerForm[CUSTOMER_FIELDS.PHONE],
    email: customerForm[CUSTOMER_FIELDS.EMAIL],
    parentId: (customerForm[CUSTOMER_FIELDS.PARENT] as TRelatedUser)?.id,
    responsibleMemberIds: (
      customerForm[CUSTOMER_FIELDS.RESPONSIBLE_MEMBER] as TRelatedUser[]
    ).map((member) => member?.id),
    shippingName: customerForm[CUSTOMER_FIELDS.SHIPPING_NAME],
    shippingAddress,
    billingName: customerForm[CUSTOMER_FIELDS.BILLING_NAME],
    billingAddress,
  };
  if (customerForm[CUSTOMER_FIELDS.NOTES]) {
    createObject['notes'] = customerForm[CUSTOMER_FIELDS.NOTES];
  }
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
