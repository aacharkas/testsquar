import { Prisma } from '@prisma/client';

export type CompanyLocationModel = Prisma.CompanyLocationGetPayload<{
  include: { address: true };
}>;
