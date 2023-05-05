export const COMPANY_PROFILE_FIELDS = {
  COMPANY_ID: 'id',
  COMPANY_AVATAR: 'avatarId',
  COMPANY_AVATAR_LINK: 'avatar',
  COMPANY_NAME: 'name',
  COMPANY_LEGAL_NAME: 'legalName',
  COMPANY_STATUS: 'status',
  COMPANY_EMPLOYEES: 'numberOfEmployees',
  COMPANY_JOBS: 'numberOfInsuranceJobsPerMonth',
  COMPANY_COME_FROM: 'comeFrom',
  COMPANY_OWNERS: 'owners',
  COMPANY_LOCATIONS: 'locations',
  COMPANY_OWNERS_COUNT: 'totalCount',
};

export const DEFAULT_COMPANY_PROFILE = {
  [COMPANY_PROFILE_FIELDS.COMPANY_ID]: null,
  [COMPANY_PROFILE_FIELDS.COMPANY_AVATAR]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_NAME]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_STATUS]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_EMPLOYEES]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_JOBS]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_COME_FROM]: '',
  [COMPANY_PROFILE_FIELDS.COMPANY_OWNERS]: [],
  [COMPANY_PROFILE_FIELDS.COMPANY_LOCATIONS]: [],
  [COMPANY_PROFILE_FIELDS.COMPANY_OWNERS_COUNT]: 0,
};

export const PEOPLE_AMOUNT = [
  {
    id: 1,
    name: 'only me',
    value: 'only me',
  },
  {
    id: 2,
    name: '2-5',
    value: '2-5',
  },
  {
    id: 3,
    name: '6-10',
    value: '6-10',
  },
  {
    id: 4,
    name: '11-15',
    value: '11-15',
  },
  {
    id: 5,
    name: '16-25',
    value: '16-25',
  },
  {
    id: 6,
    name: '25+',
    value: '25+',
  },
];

export const JOBS_AMOUNT = [
  {
    id: 1,
    name: '1-19',
  },
  {
    id: 2,
    name: '20-49',
  },
  {
    id: 3,
    name: '50-99',
  },
  {
    id: 4,
    name: '100-250',
  },
  {
    id: 5,
    name: '251-500',
  },
  {
    id: 6,
    name: '500+',
  },
];

export const AWARENESS_OPTIONS = [
  { id: 1, name: 'Advertisement' },
  { id: 2, name: 'Event' },
  { id: 3, name: 'Google or other web search' },
  { id: 4, name: 'LinkedIn' },
  { id: 5, name: 'Facebook' },
  { id: 6, name: 'Instagram' },
  { id: 7, name: 'Know a staff member' },
  { id: 8, name: 'From colleagues' },
  { id: 9, name: 'Other' },
];

export const STATUSES_OPTIONS = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
  { id: 3, name: 'Suspended' },
];

export const ERROR_TEXT = 'Please fill in the ';

// API
export const GET_USER_API = 'user';
