import { Prisma } from '@prisma/client';

export type InsuranceCarrierModelWithMeta = Prisma.InsuranceCarrierGetPayload<{
  include: { address: true };
}>;
