export const COMPANY_FIELDS = {
  COMPANY_AVATAR: 'avatarId',
  COMPANY_AVATAR_LINK: 'avatar',
  COMPANY_NAME: 'name',
  COMPANY_EMPLOYEES: 'numberOfEmployees',
  COMPANY_JOBS: 'numberOfInsuranceJobsPerMonth',
  COMPANY_COME_FROM: 'comeFrom',
  OWNER_NAME: 'ownerName',
  OWNER_EMAIL: 'ownerEmail',
};

export const DEFAULT_COMPANY = {
  [COMPANY_FIELDS.COMPANY_AVATAR]: '',
  [COMPANY_FIELDS.COMPANY_AVATAR_LINK]: '',
  [COMPANY_FIELDS.COMPANY_NAME]: '',
  [COMPANY_FIELDS.COMPANY_EMPLOYEES]: '',
  [COMPANY_FIELDS.COMPANY_JOBS]: '',
  [COMPANY_FIELDS.COMPANY_COME_FROM]: '',
  [COMPANY_FIELDS.OWNER_NAME]: '',
  [COMPANY_FIELDS.OWNER_EMAIL]: '',
};

export const ERROR_TEXT = 'Please fill in the ';

export const COMPANY_INVITE_API = 'company/invite';
