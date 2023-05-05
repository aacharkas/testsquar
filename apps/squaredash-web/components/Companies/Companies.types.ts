import { COMPANIES_ACTIONS } from './Companies.constants';

export type TFilters = {
  search: string;
  sortOrder: string;
  skip: number;
};

export type Owner = {
  id: string;
  name: string;
};

export type TCompany = {
  id: string;
  name: string;
  status: string;
  owners: {
    rows: Owner[];
    totalCount?: number;
  };
  avatar: string;
};

export type TDropdownItem = {
  href: string;
  title: string;
  type?: COMPANIES_ACTIONS;
  id?: string;
};
