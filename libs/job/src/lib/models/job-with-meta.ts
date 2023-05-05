import { Prisma, TechStatus } from '@prisma/client';

export type PopulatedJob = Prisma.JobGetPayload<{
  include: {
    insuranceCarrier: {
      include: {
        adjusters: true;
        insuranceCarrier: true;
      };
    };
    groups: {
      include: {
        lineItems: {
          include: {
            unitOfMeasurement: true;
          };
        };
      };
    };
    customer: {
      include: {
        propertyAddress: true;
        customer: {
          include: {
            shippingAddress: true;
          };
        };
      };
    };
    insuranceScope: true;
    contracts: {
      where: {
        techStatus: {
          not: TechStatus;
        };
      };
      orderBy: {
        initialDocumentName: 'asc';
      };
    };
  };
}>;

export type JobWithMeta = PopulatedJob & { totals: JobTotals };

export type JobTotals = {
  lineItemsTotal: number;
  totalTax: number;
  totalRCV: number;
  totalOverheadAndProfit: number;
  totalDepreciationSum: number;
  deductible: number;
  totalACV: number;
  netClaimItem: number;
  totalRecoverableDepreciationSum: number;
  totalNonRecoverableDepreciationSum: number;
  netClaimIfDepreciationIsRecovered: number;
};
