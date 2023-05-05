import { LOCATION_FIELDS } from '../LocationForm.constants';
import type { TLocationForm } from '../LocationForm.types';
import { TLocationErrors } from '../LocationForm.types';

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
    [LOCATION_FIELDS.ADDRESS_NAME]: addressObject?.formatted_address,
    [LOCATION_FIELDS.ADDRESS_COUNTRY]: country,
    [LOCATION_FIELDS.ADDRESS_ZIP_CODE]: zipCode,
    [LOCATION_FIELDS.ADDRESS_STATE]: state,
    [LOCATION_FIELDS.ADDRESS_CITY]: city,
    [LOCATION_FIELDS.ADDRESS_STREET]: `${streetAddress1Name} ${streetAddress1Number}`,
    [LOCATION_FIELDS.ADDRESS_PLACE_ID]: addressObject?.place_id,
    [LOCATION_FIELDS.ADDRESS_LATITUDE]: location?.lat && location.lat(),
    [LOCATION_FIELDS.ADDRESS_LONGITUDE]: location?.lng && location.lng(),
  };
};

export const checkLocationFormError = (
  locationForm: TLocationForm,
  formatError: (name: string, field: string) => string
): TLocationErrors => {
  const errors = {};
  if (!locationForm[LOCATION_FIELDS.ADDRESS_NAME])
    errors[LOCATION_FIELDS.ADDRESS_NAME] = formatError('IM0001', 'Address');
  if (!locationForm[LOCATION_FIELDS.OFFICE_NAME])
    errors[LOCATION_FIELDS.OFFICE_NAME] = formatError('IM0001', 'Office name');
  if (!locationForm[LOCATION_FIELDS.ADDRESS_CITY])
    errors[LOCATION_FIELDS.ADDRESS_CITY] = formatError('IM0027', 'City');
  if (!locationForm[LOCATION_FIELDS.ADDRESS_STATE])
    errors[LOCATION_FIELDS.ADDRESS_STATE] = formatError('IM0027', 'State');
  if (!locationForm[LOCATION_FIELDS.ADDRESS_ZIP_CODE])
    errors[LOCATION_FIELDS.ADDRESS_ZIP_CODE] = formatError(
      'IM0027',
      'Zip Code'
    );
  if (!locationForm[LOCATION_FIELDS.EMAIL])
    errors[LOCATION_FIELDS.EMAIL] = formatError('IM0001', 'Email');
  if (!locationForm[LOCATION_FIELDS.PHONE])
    errors[LOCATION_FIELDS.PHONE] = formatError('IM0001', 'Phone');
  return errors;
};

// restruct get structure to form structure
export const formatGetData = (locationForm: object): TLocationForm => {
  const address = locationForm?.[LOCATION_FIELDS.ADDRESS] ?? {};
  return {
    [LOCATION_FIELDS.COMPANY_ID]: locationForm?.[LOCATION_FIELDS.COMPANY_ID],
    [LOCATION_FIELDS.OFFICE_NAME]: locationForm?.[LOCATION_FIELDS.OFFICE_NAME],
    [LOCATION_FIELDS.PHONE]: locationForm?.[LOCATION_FIELDS.PHONE],
    [LOCATION_FIELDS.EMAIL]: locationForm?.[LOCATION_FIELDS.EMAIL],
    [LOCATION_FIELDS.IS_MAIN_OFFICE]:
      locationForm?.[LOCATION_FIELDS.IS_MAIN_OFFICE],
    // Address
    [LOCATION_FIELDS.ADDRESS_COUNTRY]: address[LOCATION_FIELDS.ADDRESS_COUNTRY],
    [LOCATION_FIELDS.ADDRESS_STATE]: address[LOCATION_FIELDS.ADDRESS_STATE],
    [LOCATION_FIELDS.ADDRESS_CITY]: address[LOCATION_FIELDS.ADDRESS_CITY],
    [LOCATION_FIELDS.ADDRESS_ZIP_CODE]:
      address[LOCATION_FIELDS.ADDRESS_ZIP_CODE],
    [LOCATION_FIELDS.ADDRESS_STREET]: address[LOCATION_FIELDS.ADDRESS_STREET],
    [LOCATION_FIELDS.ADDRESS_STREET_2]:
      address[LOCATION_FIELDS.ADDRESS_STREET_2],
    [LOCATION_FIELDS.ADDRESS_APARTMENT]:
      address[LOCATION_FIELDS.ADDRESS_APARTMENT],
    [LOCATION_FIELDS.ADDRESS_LATITUDE]:
      address[LOCATION_FIELDS.ADDRESS_LATITUDE],
    [LOCATION_FIELDS.ADDRESS_LONGITUDE]:
      address[LOCATION_FIELDS.ADDRESS_LONGITUDE],
    [LOCATION_FIELDS.ADDRESS_PLACE_ID]:
      address[LOCATION_FIELDS.ADDRESS_PLACE_ID],
    [LOCATION_FIELDS.ADDRESS_NAME]: address[LOCATION_FIELDS.ADDRESS_NAME],
    [LOCATION_FIELDS.ADDRESS]: address[LOCATION_FIELDS.ADDRESS_NAME],
    [LOCATION_FIELDS.ADDRESS_ID]: address[LOCATION_FIELDS.ADDRESS_ID],
  };
};

export const formatEditData = (
  originalLocation: object,
  locationForm: TLocationForm
): object => {
  const editResult = {};
  const compareMainValues = (name: string): void => {
    if (originalLocation[name] !== locationForm[name]) {
      editResult[name] = locationForm[name];
    }
  };
  compareMainValues(LOCATION_FIELDS.OFFICE_NAME);
  compareMainValues(LOCATION_FIELDS.PHONE);
  compareMainValues(LOCATION_FIELDS.EMAIL);
  compareMainValues(LOCATION_FIELDS.IS_MAIN_OFFICE);

  const address = originalLocation[LOCATION_FIELDS.ADDRESS] ?? {};
  editResult[LOCATION_FIELDS.ADDRESS] = {};
  const compareAddressValues = (name: string): void => {
    if (address[name] !== locationForm[name]) {
      editResult[LOCATION_FIELDS.ADDRESS][name] = locationForm[name];
    }
  };
  compareAddressValues(LOCATION_FIELDS.ADDRESS_COUNTRY);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_CITY);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_STATE);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_ZIP_CODE);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_STREET);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_STREET_2);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_APARTMENT);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_LATITUDE);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_LONGITUDE);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_PLACE_ID);
  compareAddressValues(LOCATION_FIELDS.ADDRESS_NAME);

  return editResult;
};

// restruct get structure to form structure
export const formatCreateData = (
  locationForm: TLocationForm,
  update = false,
  companyId?: string | string[]
) => {
  const address = {
    [LOCATION_FIELDS.ADDRESS_COUNTRY]:
      locationForm[LOCATION_FIELDS.ADDRESS_COUNTRY],
    [LOCATION_FIELDS.ADDRESS_STATE]:
      locationForm[LOCATION_FIELDS.ADDRESS_STATE],
    [LOCATION_FIELDS.ADDRESS_CITY]: locationForm[LOCATION_FIELDS.ADDRESS_CITY],
    [LOCATION_FIELDS.ADDRESS_ZIP_CODE]:
      locationForm[LOCATION_FIELDS.ADDRESS_ZIP_CODE],
    [LOCATION_FIELDS.ADDRESS_STREET]:
      locationForm[LOCATION_FIELDS.ADDRESS_STREET],
    [LOCATION_FIELDS.ADDRESS_STREET_2]:
      locationForm[LOCATION_FIELDS.ADDRESS_STREET_2],
    [LOCATION_FIELDS.ADDRESS_APARTMENT]:
      locationForm[LOCATION_FIELDS.ADDRESS_APARTMENT],
    [LOCATION_FIELDS.ADDRESS_LATITUDE]:
      locationForm[LOCATION_FIELDS.ADDRESS_LATITUDE],
    [LOCATION_FIELDS.ADDRESS_LONGITUDE]:
      locationForm[LOCATION_FIELDS.ADDRESS_LONGITUDE],
    [LOCATION_FIELDS.ADDRESS_PLACE_ID]:
      locationForm[LOCATION_FIELDS.ADDRESS_PLACE_ID],
    [LOCATION_FIELDS.ADDRESS_NAME]: locationForm[LOCATION_FIELDS.ADDRESS_NAME],
  };
  if (update) {
    address[LOCATION_FIELDS.ADDRESS_ID] =
      locationForm[LOCATION_FIELDS.ADDRESS_ID];
  }
  const result = {
    [LOCATION_FIELDS.OFFICE_NAME]: locationForm[LOCATION_FIELDS.OFFICE_NAME],
    [LOCATION_FIELDS.PHONE]: locationForm[LOCATION_FIELDS.PHONE],
    [LOCATION_FIELDS.EMAIL]: locationForm[LOCATION_FIELDS.EMAIL],
    [LOCATION_FIELDS.IS_MAIN_OFFICE]:
      locationForm[LOCATION_FIELDS.IS_MAIN_OFFICE],
    [LOCATION_FIELDS.ADDRESS]: address,
  };

  if (locationForm[LOCATION_FIELDS.COMPANY_ID]) {
    result.companyId = locationForm[LOCATION_FIELDS.COMPANY_ID];
  }

  return result;
};
