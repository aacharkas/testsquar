import { Prisma } from '@prisma/client';

export type CustomerFind = Prisma.CustomerGetPayload<{
  include: {
    subCustomers?: true;
    billingAddress?: true;
    shippingAddress?: true;
    parent?: true;
    responsibleMembers?: true;
  };
}>;
