import { Prisma } from '@prisma/client';

export type CompanyModel = Prisma.CompanyGetPayload<{
  include: { users: true };
}>;
