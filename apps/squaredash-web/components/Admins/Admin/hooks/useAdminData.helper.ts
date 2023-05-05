import { IItem } from '../../../../../../libs/web/components/Select/SelectControlled';
import { ROLES } from '../../../../constants/roles';
import { TIME_ZONES } from '../../../../constants/timezones';
import { ADMIN_FIELDS } from '../AdminForm.constants';
import type {
  TAdminErrors,
  TAdminForm,
  TAdminResponse,
} from '../AdminForm.types';

export const checkAdminFormError = (
  adminForm: TAdminForm,
  formatError: (name: string) => string
): TAdminErrors => {
  const errors = {};
  if (!adminForm[ADMIN_FIELDS.EMAIL])
    errors[ADMIN_FIELDS.EMAIL] = formatError('email');
  if (!adminForm[ADMIN_FIELDS.FULL_NAME])
    errors[ADMIN_FIELDS.FULL_NAME] = formatError('full name');
  return errors;
};

// restruct get structure to form structure
export const formatGetData = (adminForm: TAdminResponse): TAdminForm => {
  return {
    [ADMIN_FIELDS.FULL_NAME]: adminForm?.name,
    [ADMIN_FIELDS.EMAIL]: adminForm?.email,
    [ADMIN_FIELDS.STATUS]: adminForm?.status,
    [ADMIN_FIELDS.TIME_ZONE]:
      TIME_ZONES.find((item) => item?.type === adminForm?.timezone) ||
      TIME_ZONES[0],
    [ADMIN_FIELDS.IMAGE]: adminForm?.avatarId,
    [ADMIN_FIELDS.IMAGE_LINK]: adminForm?.avatar,
  };
};

export const formatEditData = (
  originalAdmin: TAdminForm,
  adminForm: TAdminForm
): object => {
  const editResult = {};

  const compareMainValues = (
    originalName: string,
    name: string,
    predefinedValue?: any
  ): void => {
    if (originalAdmin[originalName] !== (predefinedValue || adminForm[name])) {
      editResult[originalName] = predefinedValue || adminForm[name];
    }
  };

  compareMainValues('name', ADMIN_FIELDS.FULL_NAME);
  compareMainValues('email', ADMIN_FIELDS.EMAIL);
  compareMainValues(
    'timezone',
    ADMIN_FIELDS.TIME_ZONE,
    (adminForm[ADMIN_FIELDS.TIME_ZONE] as IItem)?.type
  );
  compareMainValues('avatarId', ADMIN_FIELDS.IMAGE);

  return editResult;
};

export const formatCreateData = (adminForm: TAdminForm) => {
  return {
    [ADMIN_FIELDS.FULL_NAME]: adminForm[ADMIN_FIELDS.FULL_NAME],
    [ADMIN_FIELDS.ROLE]: ROLES.SUPER_ADMIN,
    [ADMIN_FIELDS.EMAIL]: adminForm[ADMIN_FIELDS.EMAIL],
    [ADMIN_FIELDS.TIME_ZONE]: (adminForm[ADMIN_FIELDS.TIME_ZONE] as IItem)
      ?.type,
    [ADMIN_FIELDS.IMAGE]: adminForm[ADMIN_FIELDS.IMAGE],
  };
};
