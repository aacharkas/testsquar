import { IItem } from '../../../../../../../../libs/web/components/Select/SelectControlled';
import { ADJUSTER_FIELDS } from '../AdjusterForm.constants';
import { TAdjusterErrors, TAdjusterForm } from '../AdjusterForm.types';

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
    [ADJUSTER_FIELDS.ADDRESS_NAME]: addressObject?.formatted_address,
    [ADJUSTER_FIELDS.ADDRESS_COUNTRY]: country,
    [ADJUSTER_FIELDS.ADDRESS_ZIP_CODE]: zipCode,
    [ADJUSTER_FIELDS.ADDRESS_STATE]: state,
    [ADJUSTER_FIELDS.ADDRESS_CITY]: city,
    [ADJUSTER_FIELDS.ADDRESS_STREET]: `${streetAddress1Name} ${streetAddress1Number}`,
    [ADJUSTER_FIELDS.ADDRESS_PLACE_ID]: addressObject?.place_id,
    [ADJUSTER_FIELDS.ADDRESS_LATITUDE]: location?.lat && location.lat(),
    [ADJUSTER_FIELDS.ADDRESS_LONGITUDE]: location?.lng && location.lng(),
  };
};

export const checkAdjusterFormError = (
  adjusterForm: TAdjusterForm,
  formatError: (name: string, field: string) => string
): TAdjusterErrors => {
  const errors = {};
  if (!adjusterForm[ADJUSTER_FIELDS.NAME])
    errors[ADJUSTER_FIELDS.NAME] = formatError('IM0001', 'Full Name');
  return errors;
};

// restruct get structure to form structure
export const formatCreateData = (adjusterForm: TAdjusterForm) => {
  return {
    [ADJUSTER_FIELDS.NAME]: adjusterForm[ADJUSTER_FIELDS.NAME],
    [ADJUSTER_FIELDS.TYPE]: (adjusterForm[ADJUSTER_FIELDS.TYPE] as IItem)?.type,
    [ADJUSTER_FIELDS.PHONE]: adjusterForm[ADJUSTER_FIELDS.PHONE],
    [ADJUSTER_FIELDS.EMAIL]: adjusterForm[ADJUSTER_FIELDS.EMAIL],
    [ADJUSTER_FIELDS.ADDRESS]: adjusterForm[ADJUSTER_FIELDS.ADDRESS_NAME],
  };
};
