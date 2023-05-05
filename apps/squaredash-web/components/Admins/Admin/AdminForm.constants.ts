export const ADMIN_FIELDS = {
  FULL_NAME: 'name',
  ROLE: 'role',
  EMAIL: 'email',
  STATUS: 'status',
  TIME_ZONE: 'timezone',
  IMAGE: 'avatarId',
  IMAGE_LINK: 'avatar',
};

export const DEFAULT_ADMIN = {
  [ADMIN_FIELDS.FULL_NAME]: '',
  [ADMIN_FIELDS.ROLE]: '',
  [ADMIN_FIELDS.EMAIL]: '',
  [ADMIN_FIELDS.STATUS]: '',
  [ADMIN_FIELDS.TIME_ZONE]: '',
  [ADMIN_FIELDS.IMAGE]: '',
  [ADMIN_FIELDS.IMAGE_LINK]: '',
};

export const ERROR_TEXT = 'Please fill in the ';

// API
export const INVITE_ADMIN_API = 'invitation/send';
