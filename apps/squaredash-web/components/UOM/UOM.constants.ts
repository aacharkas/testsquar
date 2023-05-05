export const DEFAULT_UOM_FILTERS = {
  search: '',
  sortOrder: 'asc',
  skip: 0,
};

export const ITEMS_PER_PAGE = 25;

export enum UOM_ACTIONS {
  DELETE,
  EDIT,
}

export const UOM_FIELDS = {
  ID: 'id',
  UNIT_NAME: 'name',
  ABBREVIATION: 'abbreviation',
};

export const DEFAULT_UOM = {
  [UOM_FIELDS.UNIT_NAME]: '',
  [UOM_FIELDS.ABBREVIATION]: '',
};

export const UOM_API = 'unit-of-measurement';
