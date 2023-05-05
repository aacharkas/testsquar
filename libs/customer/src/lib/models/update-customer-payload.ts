import { Prisma } from '@prisma/client';

import { AddressBody } from '@squaredash/shared/models';

export type UpdateCustomerPayload = Prisma.CustomerUpdateInput & {
  parent?: string;
  responsibleMembers?: string[];
  billingAddress?: AddressBody;
  shippingAddress?: AddressBody;
};
