import { ROLES as APP_ROLES } from '../../constants/roles';

export const ROLES = [
  { id: 1, name: 'All roles' },
  { id: 2, name: 'Admin' },
  { id: 3, name: 'Owner' },
  { id: 4, name: 'Member' },
];

export const USER_ROLES_LABELS = {
  ALL_ROLES: 'All roles',
  COMPANY_ADMIN: 'Admin',
  COMPANY_OWNER: 'Owner',
  COMPANY_USER: 'Member',
};

export const DEFAULT_USER_ROLES = {
  Admin: APP_ROLES.COMPANY_ADMIN,
  Owner: APP_ROLES.COMPANY_OWNER,
  Member: APP_ROLES.COMPANY_USER,
};

export const STATUSES = [
  { id: 1, name: 'All statuses' },
  { id: 2, name: 'Active' },
  { id: 3, name: 'Inactive' },
  { id: 4, name: 'Suspended' },
];

export const DEFAULT_MEMBERS_FILTERS = {
  search: '',
  sortOrder: 'asc',
  resRoles: [ROLES[0]],
  resTechStatuses: [STATUSES[0]],
  skip: 0,
};

export const ITEMS_PER_PAGE = 25;

export enum MEMBER_ACTIONS {
  VIEW,
  EDIT,
  CHANGE_STATUS,
  DELETE,
}

export const GET_MEMBERS_API = 'user/list';
export const MEMBER_API = 'user';
export const UPDATE_EMAIL_API = 'auth/change-email';
