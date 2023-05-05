import { Prisma } from '@prisma/client';

import { AddressBody } from '@squaredash/shared/models';

export type CreateCustomerPayload = Prisma.CustomerCreateInput & {
  parent?: string;
  company: string;
  responsibleMembers: string[];
  billingAddress: AddressBody;
  shippingAddress: AddressBody;
};
