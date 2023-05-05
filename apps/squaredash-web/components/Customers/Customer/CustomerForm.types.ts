import { IItem } from '../../../../../libs/web/components/Select/SelectControlled';

export type TCustomerForm = {
  [x: string]:
    | string
    | boolean
    | number
    | TRelatedUser[]
    | TRelatedUser
    | IItem;
};

export type TCustomerErrors = {
  [x: string]: string | boolean;
};

export type TAddress = {
  country: string;
  state: string;
  city: string;
  zipCode: string;
  streetAddress1: string;
  streetAddress2: string;
  apartment: string;
  latitude: number;
  longitude: number;
  placeId: string;
  formattedAddress: string;
};

export type TRelatedUser = {
  id: string;
  name: string;
};

export type TCustomerGetResponse = {
  id: string;
  displayName: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: string;
  shippingName: string;
  shippingAddressId: string;
  shippingAddress: TAddress;
  responsibleMembers: TRelatedUser[];
  createdAt: string;
  updatedAt: string;
  companyId: string;
  billingName: string;
  billingAddressId: string;
  billingAddress: TAddress;
  notes: string;
  parentId: string;
  parent: TRelatedUser;
  subCustomers: TRelatedUser[];
};
