import { Address, Customer as CustomerModel } from '@prisma/client';

export type Customer = Pick<
  CustomerModel,
  | 'id'
  | 'displayName'
  | 'email'
  | 'phone'
  | 'billingName'
  | 'billingAddressId'
  | 'shippingAddressId'
  | 'parentId'
  | 'createdAt'
  | 'updatedAt'
> & {
  billingAddress: Address;
  shippingAddress: Address;
  responsibleMembers: {
    id: string;
    name: string;
  }[];
};
