import { Prisma } from '@prisma/client';

export type CompanyWithMetaModel = Prisma.CompanyGetPayload<{
  include: { locations: true; users: true };
}>;
