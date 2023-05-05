import { IItem } from '../../../../libs/web/components/Select/SelectControlled';
import { CLAIM_ITEMS_ACTIONS } from './ClaimItems.contants';

export type TClaimItem = {
  id: string;
  description: string;
  source: string;
};

export type TClaimItemForm = {
  [x: string]: string | boolean;
};
export type TClaimItemErrors = {
  [x: string]: string;
};
export type TFilters = {
  search: string;
  sortOrder: string;
  skip: number;
  source: IItem;
};
export type TDropdownItem = {
  href: string;
  title: string;
  type?: CLAIM_ITEMS_ACTIONS;
  id?: string;
};
