import { JobLineItem, PrismaClient, TechStatus } from '@prisma/client';

import * as jobCrud from '@squaredash/crud/job';

import { JobTotals, JobWithMeta, PopulatedJob } from './models/job-with-meta';

export async function getByIdWithMeta(
  id: string,
  tx?: PrismaClient
): Promise<JobWithMeta | null> {
  const job = (await jobCrud.findUnique(
    {
      where: { id },
      include: {
        insuranceCarrier: {
          include: {
            adjusters: true,
            insuranceCarrier: true,
          },
        },
        groups: {
          include: {
            lineItems: {
              include: {
                unitOfMeasurement: true,
              },
            },
          },
        },
        customer: {
          include: {
            propertyAddress: true,
            customer: {
              include: {
                shippingAddress: true,
              },
            },
          },
        },
        insuranceScope: true,
        contracts: {
          where: {
            techStatus: {
              not: TechStatus.DELETED,
            },
          },
          orderBy: {
            initialDocumentName: 'asc',
          },
        },
      },
    },
    tx
  )) as PopulatedJob | null;

  if (!job) {
    return null;
  }

  return {
    ...job,
    totals: calculateJobTotals(job),
  };
}

function calculateJobTotals(job: PopulatedJob): JobTotals {
  const includedLineItems = getIncludedItems(job);

  const totalRCV = calculateTotalRCV(includedLineItems);
  const deductible = job.insuranceScope.deductible;
  const totalDepreciationSum = calculateTotalDepreciationSum(includedLineItems);

  const totalRecoverableDepreciationSum =
    calculateTotalRecoverableDepreciationSum(includedLineItems);
  const totalNonRecoverableDepreciationSum =
    calculateTotalNonRecoverableDepreciationSum(
      totalDepreciationSum,
      totalRecoverableDepreciationSum
    );

  return {
    lineItemsTotal: calculateLineItemsTotal(includedLineItems),
    totalTax: calculateTotalTax(includedLineItems),
    totalRCV,
    totalOverheadAndProfit: calculateTotalOverheadAndProfit(includedLineItems),
    totalDepreciationSum,
    deductible,
    totalACV: calculateTotalACV(includedLineItems),
    netClaimItem: calculateNetClaimSum(
      totalRCV,
      deductible,
      totalDepreciationSum
    ),
    totalRecoverableDepreciationSum,
    totalNonRecoverableDepreciationSum,
    netClaimIfDepreciationIsRecovered:
      calculateNetClaimIfDepreciationIsRecovered(
        totalRCV,
        deductible,
        totalNonRecoverableDepreciationSum
      ),
  };
}

const getIncludedItems = (job: PopulatedJob): JobLineItem[] =>
  job.groups
    .flatMap((group) => group.lineItems)
    .filter((item) => item.includedInJob);

const calculateLineItemsTotal = (items: JobLineItem[]) =>
  items.reduce(
    (sum, lineItem) => sum + lineItem.quantity * lineItem.unitPrice,
    0
  );

const calculateTotalTax = (items: JobLineItem[]) =>
  items.reduce((sum, item) => sum + item.tax, 0);

const calculateTotalRCV = (items: JobLineItem[]) =>
  items.reduce((sum, item) => sum + item.rcv, 0);

const calculateTotalOverheadAndProfit = (items: JobLineItem[]) =>
  items.reduce((sum, item) => sum + item.overheadAndProfit, 0);

const calculateTotalDepreciationSum = (items: JobLineItem[]) =>
  items.reduce((sum, item) => sum + item.depreciationSum, 0);

const calculateTotalACV = (items: JobLineItem[]) =>
  items.reduce((sum, item) => sum + item.acv, 0);

const calculateNetClaimSum = (
  rcv: number,
  deductible: number,
  depreciation: number
) => rcv - deductible - depreciation;

const calculateTotalRecoverableDepreciationSum = (items: JobLineItem[]) => {
  const refundableItems = items.filter(
    (item) => item.isDepreciationRecoverable
  );
  return refundableItems.reduce((sum, item) => sum + item.depreciationSum, 0);
};

const calculateTotalNonRecoverableDepreciationSum = (
  depreciationSum: number,
  recoverableSum: number
) => depreciationSum - recoverableSum;

const calculateNetClaimIfDepreciationIsRecovered = (
  rcv: number,
  deductible: number,
  nonRecoverableDepreciation: number
) => rcv - deductible - nonRecoverableDepreciation;
