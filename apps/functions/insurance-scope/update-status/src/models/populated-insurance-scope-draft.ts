import { Prisma } from '@prisma/client';

export type FindPopulatedScopeInput = {
  where: {
    id: string;
  };
  include: {
    groups: true;
    items: true;
    customer: true;
    insuranceCarrier: {
      include: {
        adjusters: true;
      };
    };
  };
};

export type PopulatedInsuranceScopeDraft =
  Prisma.InsuranceScopeDraftGetPayload<FindPopulatedScopeInput>;
