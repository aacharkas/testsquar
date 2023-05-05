import { Address, Customer } from '@prisma/client';

type subCustomer = {
  id: string;
  displayName: string;
};

export type CustomerWithMeta = Customer & {
  billingAddress: Address;
  shippingAddress: Address;
  responsibleMembers: {
    id: string;
    name: string;
  }[];
  subCustomers: subCustomer[];
  parent?: subCustomer;
};
