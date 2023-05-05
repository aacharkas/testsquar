import moment from 'moment';

import type { IItem } from '../../../../../../libs/web/components/Select/SelectControlled';
import { TIME_ZONES } from '../../../../constants/timezones';
import { dateFormat } from '../../Members.helper';
import {
  CURRENT_YEAR,
  DATA_FORMAT,
  MEMBER_FIELDS,
  ROLES,
} from '../MemberForm.constants';
import { STATUSES } from '../MemberForm.constants';
import type { TMemberErrors, TMemberForm } from '../MemberForm.types';

export const checkMemberFormError = (
  memberForm: TMemberForm,
  formatError: (name: string) => string
): TMemberErrors => {
  const errors = {};
  if (!memberForm[MEMBER_FIELDS.EMAIL])
    errors[MEMBER_FIELDS.EMAIL] = formatError('email');
  if (!memberForm[MEMBER_FIELDS.FULL_NAME])
    errors[MEMBER_FIELDS.FULL_NAME] = formatError('full name');
  if (
    memberForm[MEMBER_FIELDS.DATE_OF_BIRTH] &&
    !moment(
      (memberForm[MEMBER_FIELDS.DATE_OF_BIRTH] + CURRENT_YEAR) as string,
      'MM/DD/YYYY'
    ).isValid()
  ) {
    errors[MEMBER_FIELDS.DATE_OF_BIRTH] = 'Please check the date format';
  }
  return errors;
};

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
    [MEMBER_FIELDS.ADDRESS_NAME]: addressObject?.formatted_address,
    [MEMBER_FIELDS.ADDRESS_COUNTRY]: country,
    [MEMBER_FIELDS.ADDRESS_ZIP_CODE]: zipCode,
    [MEMBER_FIELDS.ADDRESS_STATE]: state,
    [MEMBER_FIELDS.ADDRESS_CITY]: city,
    [MEMBER_FIELDS.ADDRESS_STREET]: `${streetAddress1Name} ${streetAddress1Number}`,
    [MEMBER_FIELDS.ADDRESS_PLACE_ID]: addressObject?.place_id,
    [MEMBER_FIELDS.ADDRESS_LATITUDE]: location?.lat && location.lat(),
    [MEMBER_FIELDS.ADDRESS_LONGITUDE]: location?.lng && location.lng(),
  };
};

// restruct get structure to form structure
export const formatGetData = (memberForm: object): TMemberForm => {
  const address = memberForm?.[MEMBER_FIELDS.ADDRESS] ?? {};
  return {
    [MEMBER_FIELDS.FULL_NAME]: memberForm?.[MEMBER_FIELDS.FULL_NAME],
    [MEMBER_FIELDS.ROLE]:
      ROLES.find((item) => item?.type === memberForm?.[MEMBER_FIELDS.ROLE]) ??
      ROLES[0],
    [MEMBER_FIELDS.STATUS]:
      STATUSES.find(
        (item) =>
          item?.name?.toLowerCase() ===
          memberForm?.[MEMBER_FIELDS.STATUS]?.toLowerCase()
      ) ?? STATUSES[0],
    [MEMBER_FIELDS.EMAIL]: memberForm?.[MEMBER_FIELDS.EMAIL],
    [MEMBER_FIELDS.PHONE]: memberForm?.[MEMBER_FIELDS.PHONE],
    [MEMBER_FIELDS.TIME_ZONE]:
      TIME_ZONES.find(
        (zone) => zone?.type == memberForm?.[MEMBER_FIELDS.TIME_ZONE]
      ) || TIME_ZONES[0],
    [MEMBER_FIELDS.DATE_OF_BIRTH]:
      memberForm?.[MEMBER_FIELDS.DATE_OF_BIRTH] &&
      dateFormat(memberForm?.[MEMBER_FIELDS.DATE_OF_BIRTH]),
    [MEMBER_FIELDS.T_SHIRT_SIZE]: memberForm?.[MEMBER_FIELDS.T_SHIRT_SIZE],
    [MEMBER_FIELDS.IMAGE]: memberForm?.[MEMBER_FIELDS.IMAGE],
    [MEMBER_FIELDS.IMAGE_LINK]: memberForm?.[MEMBER_FIELDS.IMAGE_LINK],
    // Address
    [MEMBER_FIELDS.ADDRESS_COUNTRY]: address?.[MEMBER_FIELDS.ADDRESS_COUNTRY],
    [MEMBER_FIELDS.ADDRESS_STATE]: address?.[MEMBER_FIELDS.ADDRESS_STATE],
    [MEMBER_FIELDS.ADDRESS_CITY]: address?.[MEMBER_FIELDS.ADDRESS_CITY],
    [MEMBER_FIELDS.ADDRESS_ZIP_CODE]: address?.[MEMBER_FIELDS.ADDRESS_ZIP_CODE],
    [MEMBER_FIELDS.ADDRESS_STREET]: address?.[MEMBER_FIELDS.ADDRESS_STREET],
    [MEMBER_FIELDS.ADDRESS_STREET_2]: address?.[MEMBER_FIELDS.ADDRESS_STREET_2],
    [MEMBER_FIELDS.ADDRESS_APARTMENT]:
      address?.[MEMBER_FIELDS.ADDRESS_APARTMENT],
    [MEMBER_FIELDS.ADDRESS_LATITUDE]: address?.[MEMBER_FIELDS.ADDRESS_LATITUDE],
    [MEMBER_FIELDS.ADDRESS_LONGITUDE]:
      address?.[MEMBER_FIELDS.ADDRESS_LONGITUDE],
    [MEMBER_FIELDS.ADDRESS_PLACE_ID]: address?.[MEMBER_FIELDS.ADDRESS_PLACE_ID],
    [MEMBER_FIELDS.ADDRESS_NAME]: address?.[MEMBER_FIELDS.ADDRESS_NAME],
    [MEMBER_FIELDS.ADDRESS]: address?.[MEMBER_FIELDS.ADDRESS_NAME],
    [MEMBER_FIELDS.ADDRESS_ID]: address?.[MEMBER_FIELDS.ADDRESS_ID],
  };
};

export const formatUpdateData = (memberForm: TMemberForm) => {
  const dateOfBirth = moment(
    (memberForm[MEMBER_FIELDS.DATE_OF_BIRTH] + CURRENT_YEAR) as string,
    DATA_FORMAT
  ).toDate();

  const address = {
    [MEMBER_FIELDS.ADDRESS_COUNTRY]: memberForm[MEMBER_FIELDS.ADDRESS_COUNTRY],
    [MEMBER_FIELDS.ADDRESS_STATE]: memberForm[MEMBER_FIELDS.ADDRESS_STATE],
    [MEMBER_FIELDS.ADDRESS_CITY]: memberForm[MEMBER_FIELDS.ADDRESS_CITY],
    [MEMBER_FIELDS.ADDRESS_ZIP_CODE]:
      memberForm[MEMBER_FIELDS.ADDRESS_ZIP_CODE] || '',
    [MEMBER_FIELDS.ADDRESS_STREET]: memberForm[MEMBER_FIELDS.ADDRESS_STREET],
    [MEMBER_FIELDS.ADDRESS_STREET_2]:
      memberForm[MEMBER_FIELDS.ADDRESS_STREET_2],
    [MEMBER_FIELDS.ADDRESS_APARTMENT]:
      memberForm[MEMBER_FIELDS.ADDRESS_APARTMENT],
    [MEMBER_FIELDS.ADDRESS_LATITUDE]:
      memberForm[MEMBER_FIELDS.ADDRESS_LATITUDE],
    [MEMBER_FIELDS.ADDRESS_LONGITUDE]:
      memberForm[MEMBER_FIELDS.ADDRESS_LONGITUDE],
    [MEMBER_FIELDS.ADDRESS_PLACE_ID]:
      memberForm[MEMBER_FIELDS.ADDRESS_PLACE_ID],
    [MEMBER_FIELDS.ADDRESS_NAME]: memberForm[MEMBER_FIELDS.ADDRESS_NAME],
    [MEMBER_FIELDS.ADDRESS_ID]: memberForm[MEMBER_FIELDS.ADDRESS_ID],
  };

  return {
    [MEMBER_FIELDS.FULL_NAME]: memberForm[MEMBER_FIELDS.FULL_NAME],
    [MEMBER_FIELDS.ROLE]: (memberForm[MEMBER_FIELDS.ROLE] as IItem)?.type,
    [MEMBER_FIELDS.EMAIL]: memberForm[MEMBER_FIELDS.EMAIL],
    [MEMBER_FIELDS.PHONE]: memberForm[MEMBER_FIELDS.PHONE] || null,
    [MEMBER_FIELDS.TIME_ZONE]: (memberForm[MEMBER_FIELDS.TIME_ZONE] as IItem)
      ?.type,
    [MEMBER_FIELDS.DATE_OF_BIRTH]: dateOfBirth,
    [MEMBER_FIELDS.T_SHIRT_SIZE]:
      memberForm[MEMBER_FIELDS.T_SHIRT_SIZE] || null,
    [MEMBER_FIELDS.IMAGE]: memberForm[MEMBER_FIELDS.IMAGE],
    [MEMBER_FIELDS.ADDRESS]: memberForm[MEMBER_FIELDS.ADDRESS_NAME]
      ? address
      : null,
    [MEMBER_FIELDS.STATUS]: (memberForm[MEMBER_FIELDS.STATUS] as IItem)?.type,
  };
};

export const formatCreateData = (memberForm: TMemberForm) => {
  const dateOfBirth = moment(
    (memberForm[MEMBER_FIELDS.DATE_OF_BIRTH] + CURRENT_YEAR) as string,
    DATA_FORMAT
  ).toDate();

  const address = {
    [MEMBER_FIELDS.ADDRESS_COUNTRY]: memberForm[MEMBER_FIELDS.ADDRESS_COUNTRY],
    [MEMBER_FIELDS.ADDRESS_STATE]: memberForm[MEMBER_FIELDS.ADDRESS_STATE],
    [MEMBER_FIELDS.ADDRESS_CITY]: memberForm[MEMBER_FIELDS.ADDRESS_CITY],
    [MEMBER_FIELDS.ADDRESS_ZIP_CODE]:
      memberForm[MEMBER_FIELDS.ADDRESS_ZIP_CODE] || '',
    [MEMBER_FIELDS.ADDRESS_STREET]: memberForm[MEMBER_FIELDS.ADDRESS_STREET],
    [MEMBER_FIELDS.ADDRESS_STREET_2]:
      memberForm[MEMBER_FIELDS.ADDRESS_STREET_2],
    [MEMBER_FIELDS.ADDRESS_APARTMENT]:
      memberForm[MEMBER_FIELDS.ADDRESS_APARTMENT],
    [MEMBER_FIELDS.ADDRESS_LATITUDE]:
      memberForm[MEMBER_FIELDS.ADDRESS_LATITUDE],
    [MEMBER_FIELDS.ADDRESS_LONGITUDE]:
      memberForm[MEMBER_FIELDS.ADDRESS_LONGITUDE],
    [MEMBER_FIELDS.ADDRESS_PLACE_ID]:
      memberForm[MEMBER_FIELDS.ADDRESS_PLACE_ID],
    [MEMBER_FIELDS.ADDRESS_NAME]: memberForm[MEMBER_FIELDS.ADDRESS_NAME],
  };

  return {
    [MEMBER_FIELDS.FULL_NAME]: memberForm[MEMBER_FIELDS.FULL_NAME],
    [MEMBER_FIELDS.ROLE]: (memberForm[MEMBER_FIELDS.ROLE] as IItem)?.type,
    [MEMBER_FIELDS.EMAIL]: memberForm[MEMBER_FIELDS.EMAIL],
    [MEMBER_FIELDS.PHONE]: memberForm[MEMBER_FIELDS.PHONE] || null,
    [MEMBER_FIELDS.TIME_ZONE]: (memberForm[MEMBER_FIELDS.TIME_ZONE] as IItem)
      ?.type,
    [MEMBER_FIELDS.DATE_OF_BIRTH]: dateOfBirth,
    [MEMBER_FIELDS.T_SHIRT_SIZE]:
      memberForm[MEMBER_FIELDS.T_SHIRT_SIZE] || null,
    [MEMBER_FIELDS.IMAGE]: memberForm[MEMBER_FIELDS.IMAGE],
    [MEMBER_FIELDS.ADDRESS]: memberForm[MEMBER_FIELDS.ADDRESS_NAME]
      ? address
      : null,
  };
};
export const checkEmail = (
  email: string,
  formatError: (name: string) => string
) => {
  const errors = {};
  if (!email) errors[MEMBER_FIELDS.EMAIL] = formatError('email');
  return errors;
};
