import { Prisma } from '@prisma/client';

import { CreateAddressPayload } from '@squaredash/address';

export type CreateCompanyLocationPayload = Prisma.CompanyLocationCreateInput & {
  address: CreateAddressPayload;
  company: string;
};
