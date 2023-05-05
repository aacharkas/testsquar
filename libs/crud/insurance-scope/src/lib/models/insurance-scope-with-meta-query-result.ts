import { InsuranceScopeView, Job, Prisma } from '@prisma/client';

export type InsuranceCarrierViewQueryResult =
  Prisma.InsuranceCarrierViewGetPayload<{
    include: { adjusters: true };
  }>;

export type InsuranceScopeGroupViewQueryResult =
  Prisma.InsuranceScopeGroupViewGetPayload<{
    include: { items: true };
  }>;

export type CustomerViewQueryResult = Prisma.CustomerViewGetPayload<{
  include: {
    customer: {
      include: {
        billingAddress: true;
        shippingAddress: true;
      };
    };
  };
}>;

export type InsuranceScopeWithMetaQueryResult = InsuranceScopeView & {
  customer: CustomerViewQueryResult;
  insuranceCarrier: InsuranceCarrierViewQueryResult;
  groups: InsuranceScopeGroupViewQueryResult[];
  job: Job | null;
};
