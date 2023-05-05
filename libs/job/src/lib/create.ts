import {
  JobStatus,
  JobVersionStatus,
  Prisma,
  PrismaClient,
} from '@prisma/client';
import * as _ from 'lodash';

import * as insuranceScopeCrud from '@squaredash/crud/insurance-scope';
import * as jobCrud from '@squaredash/crud/job';
import * as jobInsuranceCarrierCrud from '@squaredash/crud/job-insurance-carrier';
import * as jobLineItemsGroupCrud from '@squaredash/crud/job-line-items-group';
import * as unitOfMeasurementCrud from '@squaredash/crud/unit-of-measurement';
import * as jobsService from '@squaredash/job';
import { CreateJobVersionPayload } from '@squaredash/job';
import * as jobHistoryEventService from '@squaredash/job-history-event';
import { JobHistoryEventType } from '@squaredash/job-history-event';
import { ArrayElement } from '@squaredash/shared/util';

import { JobNotFoundException } from './exceptions/job-not-found.exception';
import { CreateJobPayload } from './models/create-job-payload';

export type InsuranceScopeForJobCreation = Prisma.InsuranceScopeGetPayload<{
  include: {
    groups: {
      include: {
        items: true;
      };
    };
    customer: true;
    insuranceCarrier: {
      include: {
        adjusters: true;
      };
    };
  };
}>;

export async function createJob(
  { insuranceScopeId, creatorId, versionPayload }: CreateJobPayload,
  tx?: PrismaClient
) {
  const findUniquePayload = {
    where: {
      id: insuranceScopeId,
    },
    include: {
      groups: {
        include: {
          items: true,
        },
      },
      customer: true,
      insuranceCarrier: {
        include: {
          adjusters: true,
        },
      },
    },
  };

  const insuranceScope = (await insuranceScopeCrud.findUnique(
    findUniquePayload,
    tx
  )) as InsuranceScopeForJobCreation | null;

  if (!insuranceScope) {
    throw new JobNotFoundException();
  }

  const job = await jobCrud.create(
    await getCreateJobPayload(insuranceScope, versionPayload),
    tx
  );
  await createGroups(insuranceScope, job.id, tx);
  await createInsuranceCarrier(insuranceScope, job.id, tx);

  if (!versionPayload) {
    console.log(creatorId);
    await jobHistoryEventService.createJobHistoryEvent<JobHistoryEventType.JOB_CREATED>(
      {
        userId: creatorId,
        versionId: job.versionId,
        eventType: JobHistoryEventType.JOB_CREATED,
        jobId: job.id,
      },
      tx
    );
  }

  return (await jobsService.getByIdWithMeta(job.id, tx))!;
}

const getCreateJobPayload = async (
  insuranceScope: InsuranceScopeForJobCreation,
  versionPayload?: CreateJobVersionPayload
): Promise<Prisma.JobCreateArgs> => {
  const input: Prisma.JobCreateArgs = {
    data: {
      ..._.pick(insuranceScope, [
        'claimNumber',
        'typeOfLoss',
        'dateOfLoss',
        'dateOfLoss',
        'policyNumber',
        'priceList',
      ]),
      status: JobStatus.CREATED,
      insuranceScope: {
        connect: {
          id: insuranceScope.id,
        },
      },
      versionGroup: {
        create: {},
      },
      versionStatus: JobVersionStatus.SUBMITTED,
      customer: getCreateJobCustomerPayload(insuranceScope),
    },
  };

  if (versionPayload) {
    input.data.versionGroup = {
      connect: {
        id: versionPayload.versionId,
      },
    };
    input.data.versionStatus = versionPayload.versionStatus;

    if (versionPayload.versionStatus === JobVersionStatus.PENDING) {
      input.data.status = JobStatus.UPDATE_REQUIRED;
    }
  }

  return input;
};

const getCreateJobCustomerPayload = (
  insuranceScope: InsuranceScopeForJobCreation
): Prisma.JobCustomerInfoCreateNestedOneWithoutJobInput => ({
  create: {
    propertyAddress: {
      connect: {
        id: insuranceScope.customer.billingAddressId,
      },
    },
    customer: {
      connect: {
        id: insuranceScope.customerId,
      },
    },
  },
});

async function createGroups(
  insuranceScope: InsuranceScopeForJobCreation,
  jobId: string,
  tx?: PrismaClient
) {
  return Promise.all(
    insuranceScope.groups.map(async (group) => {
      const input: Prisma.JobLineItemsGroupInfoCreateArgs = {
        data: {
          ..._.omit(group, [
            'items',
            'updatedAt',
            'createdAt',
            'insuranceScopeId',
            'parentId',
            'overhead',
            'depreciation',
            'parentId',
          ]),
          totalOverheadAndProfit: group.overhead,
          totalDepreciationSum: group.depreciation,
          job: {
            connect: {
              id: jobId,
            },
          },
          lineItems: await getCreateJobGroupLineItemsPayload(group, jobId, tx),
        },
      };

      if (group.parentId) {
        input.data.parent = {
          connect: {
            id: group.parentId,
          },
        };
      }

      return jobLineItemsGroupCrud.create(input, tx);
    })
  );
}

const getCreateJobGroupLineItemsPayload = async (
  group: ArrayElement<InsuranceScopeForJobCreation['groups']>,
  jobId: string,
  tx?: PrismaClient
): Promise<Prisma.JobLineItemUncheckedCreateNestedManyWithoutGroupInput> => ({
  createMany: {
    data: await Promise.all(
      group.items.map(async (item) => ({
        ..._.omit(item, [
          'id',
          'updatedAt',
          'unitOfMeasurement',
          'createdAt',
          'claimItemId',
          'insuranceScopeId',
          'insuranceScopeGroupId',
          'sequence',
          'overhead',
          'depreciationPercentage',
          'isDepreciationRefundable',
          'condition',
          'ageLife',
        ]),
        sequenceNumber: item.sequence,
        unitOfMeasurementId: (
          await unitOfMeasurementCrud.upsert(
            {
              where: { abbreviation: item.unitOfMeasurement },
              update: {},
              create: {
                name: item.unitOfMeasurement,
                abbreviation: item.unitOfMeasurement,
              },
            },
            tx
          )
        ).id,
        overheadAndProfit: item.overhead,
        depreciation: item.depreciationPercentage,
        isDepreciationRecoverable: item.isDepreciationRefundable,
        jobId,
      }))
    ),
  },
});

const createInsuranceCarrier = (
  insuranceScope: InsuranceScopeForJobCreation,
  jobId: string,
  tx?: PrismaClient
) =>
  jobInsuranceCarrierCrud.create(
    {
      data: {
        insuranceCarrier: {
          connect: {
            id: insuranceScope.insuranceCarrierId,
          },
        },
        email: insuranceScope.insuranceCarrier.email,
        phoneNumber: insuranceScope.insuranceCarrier.phone,
        adjusters: getCreateJobInsuranceCarrierAdjustersPayload(
          insuranceScope.insuranceCarrier,
          jobId
        ),
        job: {
          connect: {
            id: jobId,
          },
        },
      },
    },
    tx
  );

const getCreateJobInsuranceCarrierAdjustersPayload = (
  insuranceCarrier: InsuranceScopeForJobCreation['insuranceCarrier'],
  jobId: string
): Prisma.JobAdjusterInfoUncheckedCreateNestedManyWithoutJobInsuranceCarrierInput => ({
  createMany: {
    data: insuranceCarrier.adjusters.map((adjuster) => ({
      ..._.omit(adjuster, [
        'updatedAt',
        'createdAt',
        'insuranceCarrierId',
        'address',
        'phone',
      ]),
      phoneNumber: adjuster.phone,
      jobId,
    })),
  },
});
