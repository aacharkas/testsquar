import { NOTES_ACTIONS } from './Notes.constants';

export type TNotes = {
  id: string;
  title: string;
  note: string;
};

export type TDropdownItem = {
  href: string;
  title: string;
  type?: NOTES_ACTIONS;
  id?: string;
};
export type TSelectElement = {
  id: number;
  name: string;
};
export type TFilters = {
  search: string;
  sortOrder: string;
  skip: number;
  type?: TSelectElement[];
  note?: TSelectElement[];
};
