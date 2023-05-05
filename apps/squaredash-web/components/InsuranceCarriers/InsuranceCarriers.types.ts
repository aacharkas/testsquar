import type { INSURANCE_CARRIER_ACTIONS } from './InsuranceCarriers.constants';

export type TFilters = {
  search: string;
  sortOrder: string;
  skip: number;
};

export type TInsuranceCarriers = {
  id: string;
  name: string;
  email: string;
  phone: string;
  fax?: string;
  address?: {
    formattedAddress?: string;
  };
};

export type TDropdownItem = {
  href: string;
  title: string;
  type?: INSURANCE_CARRIER_ACTIONS;
  permitAction?: string;
  permitUser?: string;

  id?: string;
};
