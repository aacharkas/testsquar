import type { CUSTOMERS_ACTIONS } from './Customers.constants';

export type TSelectElement = {
  id: number;
  name: string;
  type?: string;
};

export type TFilters = {
  [x: string]: unknown;
  search: string;
  sortOrder: string;
  skip: number;
  resTypes?: string;
  parents?: TSelectElement[];
  responsibleMembers?: TSelectElement[];
};

export type TAddress = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress1?: string;
  streetAddress2?: string;
  apartment?: string;
  latitude?: number;
  longitude?: number;
  placeId?: string;
  formattedAddress: string;
};

export type TResponsibleMember = {
  id: string;
  name?: string;
  avatar?: string;
};

export type TCustomer = {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  type: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  billingName: string;
  billingAddress?: TAddress;
  shippingName: string;
  shippingAddressId: string;
  shippingAddress?: TAddress;
  responsibleMemberIds?: string[];
  responsibleMembers?: TResponsibleMember[];
  notes?: string;
  parentId?: string;
};

export type TDropdownItem = {
  href: string;
  title: string;
  type?: CUSTOMERS_ACTIONS;
  id?: string;
};
export type TFormattedData = {
  customersCount: number;
  loading: boolean;
  totalPages: number;
  customersData: TCustomer[];
  customerDetails: TCustomer[];
  loadingCustomerDetails: boolean;
  customers: TCustomer[];
  respMembers: TResponsibleMember[];
};
