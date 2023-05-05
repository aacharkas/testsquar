import { CUSTOMER_TYPE } from '../../constants/roles';

export const TYPES = [
  { id: 0, name: 'All types', type: CUSTOMER_TYPE.ALL },
  { id: 1, name: 'Customer', type: CUSTOMER_TYPE.PARENT },
  { id: 2, name: 'Sub-Customer', type: CUSTOMER_TYPE.SUB },
];

export const CUSTOMERS_LABELS = {
  ALL_PARENTS_CUSTOMERS: 'All parents customers',
  CUSTOMER: 'Customer',
  SUB_CUSTOMER: 'Sub-Customer',
};

export const CUSTOMERS = [
  { id: 0, name: 'All parents customers' },
  { id: 1, name: 'Customer' },
  { id: 2, name: 'Sub-Customer' },
];

export const RESP_MEMBERS = [
  { id: 0, name: 'All responsible members' },
  { id: 1, name: 'Member' },
  { id: 2, name: 'Not Member' },
];

export const RESP_MEMBERS_LABELS = {
  ALL_MEMBERS: 'All responsible members',
  MEMBER: 'Member',
  NOT_MEMBER: 'Not Member',
};

export const DEFAULT_CUSTOMERS_FILTERS = {
  search: '',
  sortOrder: 'asc',
  skip: 0,
  resTypes: TYPES[0].type,
  parents: [CUSTOMERS[0]],
  responsibleMembers: [RESP_MEMBERS[0]],
};

export const ITEMS_PER_PAGE = 25;
export const SEARCH_SIMBOLS = 2;
export const numberRequestElements = 5;
export const numberShowToUser = 5;

// API
export const CUSTOMERS_API = 'customer/list';

export enum CUSTOMERS_ACTIONS {
  VIEW,
  DELETE,
  EDIT,
}
