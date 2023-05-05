export const CLAIM_ITEM_FIELDS = {
  ID: 'id',
  DESCRIPTION: 'description',
  SOURCE: 'source',
  REVIEWED: 'reviewed',
};

export const DEFAULT_CLAIM_ITEM = {
  [CLAIM_ITEM_FIELDS.DESCRIPTION]: '',
  [CLAIM_ITEM_FIELDS.SOURCE]: '',
};

export const SOURCES = [
  {
    id: 1,
    name: 'OTHER',
    type: 'OTHER',
  },
  {
    id: 2,
    name: 'XACTIMATE',
    type: 'XACTIMATE',
  },
  {
    id: 3,
    name: 'SYMBILITY',
    type: 'SYMBILITY',
  },
];

export const SOURCES_FILTER = [
  {
    id: 0,
    name: 'All Sources',
    type: '',
  },
  {
    id: 1,
    name: 'OTHER',
    type: 'OTHER',
  },
  {
    id: 2,
    name: 'XACTIMATE',
    type: 'XACTIMATE',
  },
  {
    id: 3,
    name: 'SYMBILITY',
    type: 'SYMBILITY',
  },
];

export const CLAIM_ITEMS_API = 'claim-item';
export const ERROR_TEXT = 'Please fill in the ';

export const DEFAULT_CLAIM_ITEMS_FILTERS = {
  search: '',
  sortOrder: 'asc',
  skip: 0,
  source: SOURCES_FILTER[0],
};
export const ITEMS_PER_PAGE = 25;
export enum CLAIM_ITEMS_ACTIONS {
  EDIT,
  DELETE,
  ADD_TO_GLOBAL,
  REJECT,
}
export const CLAIM_ITEMS_FIRST_TAB = 'global_list';
