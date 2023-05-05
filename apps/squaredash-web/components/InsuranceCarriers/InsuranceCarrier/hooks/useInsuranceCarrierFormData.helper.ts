import { INSURANCE_CARRIER_FIELDS } from '../InsuranceCarrierForm.constants';
import type { TInsuranceCarrierForm } from '../InsuranceCarrierForm.types';
import {
  TFormattedRequest,
  TInsuranceCarrierErrors,
} from '../InsuranceCarrierForm.types';

export const processGoogleAddress = (addressObject) => {
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
    [INSURANCE_CARRIER_FIELDS.ADDRESS_NAME]: addressObject?.formatted_address,
    [INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY]: country,
    [INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE]: zipCode,
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STATE]: state,
    [INSURANCE_CARRIER_FIELDS.ADDRESS_CITY]: city,
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET]: `${streetAddress1Name} ${streetAddress1Number}`,
    [INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID]: addressObject?.place_id,
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE]:
      location?.lat && location.lat(),
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE]:
      location?.lng && location.lng(),
  };
};

export const checkInsuranceCarrierFormError = (
  insuranceCarrierForm: TInsuranceCarrierForm,
  formatError: (name: string, field: string) => string
): TInsuranceCarrierErrors => {
  const errors = {};
  if (!insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.NAME])
    errors[INSURANCE_CARRIER_FIELDS.NAME] = formatError(
      'IM0001',
      INSURANCE_CARRIER_FIELDS.NAME
    );
  return errors;
};

// restruct get structure to form structure
export const formatGetData = (
  insuranceCarrierForm: object
): TInsuranceCarrierForm => {
  const address =
    insuranceCarrierForm?.[INSURANCE_CARRIER_FIELDS.ADDRESS] ?? {};
  return {
    [INSURANCE_CARRIER_FIELDS.FAX]:
      insuranceCarrierForm?.[INSURANCE_CARRIER_FIELDS.FAX],
    [INSURANCE_CARRIER_FIELDS.PHONE]:
      insuranceCarrierForm?.[INSURANCE_CARRIER_FIELDS.PHONE],
    [INSURANCE_CARRIER_FIELDS.EMAIL]:
      insuranceCarrierForm?.[INSURANCE_CARRIER_FIELDS.EMAIL],
    [INSURANCE_CARRIER_FIELDS.NAME]:
      insuranceCarrierForm?.[INSURANCE_CARRIER_FIELDS.NAME],
    // Address
    [INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STATE]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_STATE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_CITY]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_CITY],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_STREET],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET_2]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_STREET_2],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_APARTMENT]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_APARTMENT],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_NAME]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_NAME],
    [INSURANCE_CARRIER_FIELDS.ADDRESS]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_NAME],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_ID]:
      address[INSURANCE_CARRIER_FIELDS.ADDRESS_ID],
  };
};

export const formatCreateData = (
  insuranceCarrierForm: TInsuranceCarrierForm,
  update = false
): TFormattedRequest => {
  const address = {
    [INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STATE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_STATE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_CITY]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_CITY],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_STREET],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET_2]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_STREET_2],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_APARTMENT]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_APARTMENT],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_NAME]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_NAME],
  };
  if (update) {
    address[INSURANCE_CARRIER_FIELDS.ADDRESS_ID] =
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_ID];
  }

  const formattedRequest: TFormattedRequest = {
    [INSURANCE_CARRIER_FIELDS.FAX]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.FAX],
    [INSURANCE_CARRIER_FIELDS.PHONE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.PHONE],
    [INSURANCE_CARRIER_FIELDS.EMAIL]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.EMAIL],
    [INSURANCE_CARRIER_FIELDS.NAME]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.NAME],
  };

  if (address[INSURANCE_CARRIER_FIELDS.ADDRESS_NAME]) {
    formattedRequest[INSURANCE_CARRIER_FIELDS.ADDRESS] = address;
  }
  return formattedRequest;
};

// restruct get structure to form structure
export const formatEditData = (
  insuranceCarrierForm: TInsuranceCarrierForm,
  update = false
): TFormattedRequest => {
  const address = {
    [INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_COUNTRY],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STATE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_STATE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_CITY]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_CITY],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_ZIP_CODE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_STREET],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_STREET_2]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_STREET_2],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_APARTMENT]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_APARTMENT],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_LATITUDE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_LONGITUDE],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_PLACE_ID],
    [INSURANCE_CARRIER_FIELDS.ADDRESS_NAME]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_NAME],
  };
  if (update) {
    address[INSURANCE_CARRIER_FIELDS.ADDRESS_ID] =
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.ADDRESS_ID];
  }

  const formattedRequest: TFormattedRequest = {
    [INSURANCE_CARRIER_FIELDS.FAX]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.FAX],
    [INSURANCE_CARRIER_FIELDS.PHONE]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.PHONE],
    [INSURANCE_CARRIER_FIELDS.EMAIL]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.EMAIL],
    [INSURANCE_CARRIER_FIELDS.NAME]:
      insuranceCarrierForm[INSURANCE_CARRIER_FIELDS.NAME],
  };
  if (address[INSURANCE_CARRIER_FIELDS.ADDRESS_NAME]) {
    formattedRequest[INSURANCE_CARRIER_FIELDS.ADDRESS] = address;
  }
  return formattedRequest;
};
