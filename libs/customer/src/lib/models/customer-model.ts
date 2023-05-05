import { Prisma } from '@prisma/client';

import { commonInclude } from '../consts';

export type CustomerModel = Prisma.CustomerGetPayload<{
  include: typeof commonInclude;
}>;
