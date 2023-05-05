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

export const DEFAULT_ADMINS_FILTERS = {
  search: '',
  sortOrder: 'asc',
  skip: 0,
};

export const ITEMS_PER_PAGE = 25;

export enum ADMIN_ACTIONS {
  VIEW,
  EDIT,
  DELETE,
}

export const GET_ADMINS_API = 'super-admin/list';
export const ADMIN_API = 'user';
