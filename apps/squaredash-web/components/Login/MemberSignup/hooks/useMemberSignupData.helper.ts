import jwt from 'jsonwebtoken';
import type { JwtPayload } from 'jsonwebtoken';
import { SetStateAction } from 'react';

import { MEMBER_SIGNUP_FIELDS } from '../MemberSignUp.constants';
import { TMemberSignup, TMemberSignupErrors } from '../MemberSignUp.types';

export const isTokenExpired = (token: string): boolean => {
  try {
    const { exp } = jwt.decode(token) as {
      exp: number;
    };
    const expirationDatetimeInSeconds = exp * 1000;

    return Date.now() >= expirationDatetimeInSeconds;
  } catch {
    return true;
  }
};

// restruct get structure to form structure
export const formatGetData = (
  memberSignupForm: JwtPayload | string
): TMemberSignup => {
  const address = memberSignupForm?.[MEMBER_SIGNUP_FIELDS.ADDRESS] ?? {};
  return {
    [MEMBER_SIGNUP_FIELDS.FULL_NAME]:
      memberSignupForm?.[MEMBER_SIGNUP_FIELDS.FULL_NAME],
    [MEMBER_SIGNUP_FIELDS.ROLE]: memberSignupForm?.[MEMBER_SIGNUP_FIELDS.ROLE],
    [MEMBER_SIGNUP_FIELDS.EMAIL]:
      memberSignupForm?.[MEMBER_SIGNUP_FIELDS.EMAIL],
    [MEMBER_SIGNUP_FIELDS.PHONE]:
      memberSignupForm?.[MEMBER_SIGNUP_FIELDS.PHONE],
    [MEMBER_SIGNUP_FIELDS.TIME_ZONE]:
      memberSignupForm?.[MEMBER_SIGNUP_FIELDS.TIME_ZONE],
    [MEMBER_SIGNUP_FIELDS.DATE_OF_BIRTH]:
      memberSignupForm?.[MEMBER_SIGNUP_FIELDS.DATE_OF_BIRTH],
    [MEMBER_SIGNUP_FIELDS.T_SHIRT_SIZE]:
      memberSignupForm?.[MEMBER_SIGNUP_FIELDS.T_SHIRT_SIZE],
    // TODO add filed for user image
    // [MEMBER_SIGNUP_FIELDS.IMAGE]:
    //   memberSignupForm?.[MEMBER_SIGNUP_FIELDS.IMAGE],
    // [MEMBER_SIGNUP_FIELDS.IMAGE_LINK]:
    //   memberSignupForm?.[MEMBER_SIGNUP_FIELDS.IMAGE_LINK],
    // Address
    [MEMBER_SIGNUP_FIELDS.ADDRESS_COUNTRY]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_COUNTRY],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_STATE]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_STATE],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_CITY]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_CITY],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_ZIP_CODE]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_ZIP_CODE],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_STREET]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_STREET],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_STREET_2]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_STREET_2],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_APARTMENT]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_APARTMENT],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_LATITUDE]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_LATITUDE],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_LONGITUDE]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_LONGITUDE],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_PLACE_ID]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_PLACE_ID],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_NAME]:
      address[MEMBER_SIGNUP_FIELDS.ADDRESS_NAME],
    [MEMBER_SIGNUP_FIELDS.ADDRESS]: address[MEMBER_SIGNUP_FIELDS.ADDRESS_NAME],
    [MEMBER_SIGNUP_FIELDS.ADDRESS_ID]: address[MEMBER_SIGNUP_FIELDS.ADDRESS_ID],
  };
};

// restruct get structure to form structure
export const formatCreateData = (
  memberSignUpForm: TMemberSignup,
  token: string | string[]
): object => {
  let address;
  if (memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS]) {
    address = {
      [MEMBER_SIGNUP_FIELDS.ADDRESS_COUNTRY]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_COUNTRY],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_STATE]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_STATE],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_CITY]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_CITY],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_ZIP_CODE]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_ZIP_CODE],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_STREET]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_STREET],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_STREET_2]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_STREET_2],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_APARTMENT]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_APARTMENT],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_LATITUDE]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_LATITUDE],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_LONGITUDE]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_LONGITUDE],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_PLACE_ID]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_PLACE_ID],
      [MEMBER_SIGNUP_FIELDS.ADDRESS_NAME]:
        memberSignUpForm[MEMBER_SIGNUP_FIELDS.ADDRESS_NAME],
    };
  }

  return {
    [MEMBER_SIGNUP_FIELDS.FULL_NAME]:
      memberSignUpForm[MEMBER_SIGNUP_FIELDS.FULL_NAME],
    [MEMBER_SIGNUP_FIELDS.PASSWORD]:
      memberSignUpForm[MEMBER_SIGNUP_FIELDS.PASSWORD],
    [MEMBER_SIGNUP_FIELDS.EMAIL]: memberSignUpForm[MEMBER_SIGNUP_FIELDS.EMAIL],
    [MEMBER_SIGNUP_FIELDS.ROLE]: memberSignUpForm[MEMBER_SIGNUP_FIELDS.ROLE],
    [MEMBER_SIGNUP_FIELDS.PHONE]: memberSignUpForm[MEMBER_SIGNUP_FIELDS.PHONE],
    [MEMBER_SIGNUP_FIELDS.TIME_ZONE]:
      memberSignUpForm[MEMBER_SIGNUP_FIELDS.TIME_ZONE],
    [MEMBER_SIGNUP_FIELDS.DATE_OF_BIRTH]:
      memberSignUpForm[MEMBER_SIGNUP_FIELDS.DATE_OF_BIRTH],
    [MEMBER_SIGNUP_FIELDS.T_SHIRT_SIZE]:
      memberSignUpForm[MEMBER_SIGNUP_FIELDS.T_SHIRT_SIZE],
    [MEMBER_SIGNUP_FIELDS.TIME_ZONE]:
      memberSignUpForm[MEMBER_SIGNUP_FIELDS.TIME_ZONE],
    [MEMBER_SIGNUP_FIELDS.TOKEN]: token || '',
    [MEMBER_SIGNUP_FIELDS.ADDRESS]: address,
  };
};

export const checkMemberSignupFormErrors = (
  memberSignUpForm: TMemberSignup,
  t
): SetStateAction<TMemberSignupErrors> => {
  const errors = {};
  if (!memberSignUpForm[MEMBER_SIGNUP_FIELDS.FULL_NAME].trim()) {
    errors[MEMBER_SIGNUP_FIELDS.FULL_NAME] = t('IM0001', {
      ns: 'system_errors',
      component: 'full name',
    });
  }
  if (
    !memberSignUpForm[MEMBER_SIGNUP_FIELDS.PASSWORD] ||
    !memberSignUpForm[MEMBER_SIGNUP_FIELDS.PASSWORD].trim()
  ) {
    errors[MEMBER_SIGNUP_FIELDS.PASSWORD] = t('IM0001', {
      ns: 'system_errors',
      component: 'password',
    });
  } else if (memberSignUpForm[MEMBER_SIGNUP_FIELDS.PASSWORD].length < 8) {
    errors[MEMBER_SIGNUP_FIELDS.PASSWORD] = t('IM0003', {
      ns: 'system_errors',
    });
  }
  if (
    !memberSignUpForm[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD] ||
    !memberSignUpForm[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD].trim()
  ) {
    errors[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD] = t('IM0001', {
      ns: 'system_errors',
      component: 'password',
    });
  }
  if (
    memberSignUpForm[MEMBER_SIGNUP_FIELDS.PASSWORD] &&
    memberSignUpForm[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD] &&
    memberSignUpForm[MEMBER_SIGNUP_FIELDS.PASSWORD] !==
      memberSignUpForm[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD]
  ) {
    errors[MEMBER_SIGNUP_FIELDS.CONFIRM_PASSWORD] = t('IM0007', {
      ns: 'system_errors',
    });
  }
  return errors;
};
