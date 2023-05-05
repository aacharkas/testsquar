import { Prisma } from '@prisma/client';

import { commonInclude } from '../consts';

export type CustomerModelWithMeta = Prisma.CustomerGetPayload<{
  include: {
    subCustomers: true;
    billingAddress: true;
    shippingAddress: true;
    parent: true;
    responsibleMembers: typeof commonInclude.responsibleMembers;
  };
}>;
