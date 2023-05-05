import { UOM_ACTIONS } from './UOM.constants';

export type TUOM = {
  id: string;
  name: string;
  abbreviation: string;
};

export type TFilters = {
  search: string;
  sortOrder: string;
  skip: number;
};

export type TDropdownItem = {
  href: string;
  title: string;
  type?: UOM_ACTIONS;
  id?: string;
};

export type TUOMForm = {
  [x: string]: string | boolean;
};

export type TUOMErrors = {
  [x: string]: string;
};
