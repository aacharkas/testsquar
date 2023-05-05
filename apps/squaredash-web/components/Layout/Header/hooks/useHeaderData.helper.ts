import { USER_FIELDS } from '../Header.constants';
import { TUserDefault } from '../Header.types';

export const formatGetData = (userData: object): TUserDefault => {
  return {
    [USER_FIELDS.ID]: userData?.[USER_FIELDS.ID],
    [USER_FIELDS.NAME]: userData?.[USER_FIELDS.NAME],
    [USER_FIELDS.EMAIL]: userData?.[USER_FIELDS.EMAIL],
    [USER_FIELDS.ROLE]: userData?.[USER_FIELDS.ROLE],
    [USER_FIELDS.STATUS]: userData?.[USER_FIELDS.STATUS],
    [USER_FIELDS.PHONE]: userData?.[USER_FIELDS.PHONE],
    [USER_FIELDS.AVATAR]: userData?.[USER_FIELDS.AVATAR],
    [USER_FIELDS.COMPANY_ID]: userData?.[USER_FIELDS.COMPANY_ID],
    [USER_FIELDS.ADDRESS_ID]: userData?.[USER_FIELDS.ADDRESS_ID],
    [USER_FIELDS.BIRTH_DATE]: userData?.[USER_FIELDS.BIRTH_DATE],
    [USER_FIELDS.T_SHIRT_SIZE]: userData?.[USER_FIELDS.T_SHIRT_SIZE],
    [USER_FIELDS.TECH_STATUS]: userData?.[USER_FIELDS.TECH_STATUS],
    [USER_FIELDS.TIME_ZONE]: userData?.[USER_FIELDS.TIME_ZONE],
    [USER_FIELDS.CREATED_AT]: userData?.[USER_FIELDS.CREATED_AT],
    [USER_FIELDS.UPDATED_AT]: userData?.[USER_FIELDS.UPDATED_AT],
    [USER_FIELDS.LOOKED_AT]: userData?.[USER_FIELDS.LOOKED_AT],
    [USER_FIELDS.PERMISSIONS]: userData?.[USER_FIELDS.PERMISSIONS],
  };
};