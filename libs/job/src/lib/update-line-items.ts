import { JobVersionStatus, Prisma, PrismaClient } from '@prisma/client';

import * as jobCrud from '@squaredash/crud/job';
import * as jobService from '@squaredash/job';
import * as jobHistoryEventsService from '@squaredash/job-history-event';
import { JobHistoryEventType } from '@squaredash/job-history-event';
import { prisma } from '@squaredash/shared/db';

import { JobNotFoundException } from './exceptions/job-not-found.exception';
import { OneLineItemMustBeIncludedException } from './exceptions/one-line-item-must-be-included.exception';
import { UpdateJobLineItem } from './models/update-job-line-item';

export async function updateLineItems(
  jobId: string,
  lineItems: UpdateJobLineItem[],
  updatedBy: string
) {
  return prisma.$transaction(async (tx) => {
    const transaction = tx as PrismaClient;

    const existingJob = await validateUpdate(jobId, lineItems, transaction);

    const newJobVersion = await jobService.createJob({
      insuranceScopeId: existingJob.insuranceScopeId,
      creatorId: updatedBy,
      versionPayload: {
        versionId: existingJob.versionId,
        versionStatus: JobVersionStatus.SUBMITTED,
      },
    });
    await jobCrud.update(
      {
        where: {
          id: newJobVersion.id,
        },
        data: {
          lineItems: {
            updateMany: lineItems.map((lineItem) => ({
              where: {
                jobId,
                lineItemId: lineItem.id,
              },
              data: {
                includedInJob: lineItem.includedInJob,
              },
            })),
          },
        },
      },
      transaction
    );
    await jobHistoryEventsService.createJobHistoryEvent(
      {
        userId: updatedBy,
        versionId: existingJob.versionId,
        eventType: JobHistoryEventType.JOB_UPDATED,
        jobId: newJobVersion.id,
      },
      transaction
    );

    return jobService.getByIdWithMeta(jobId, transaction);
  });
}

async function validateUpdate(
  jobId: string,
  lineItems: UpdateJobLineItem[],
  tx: PrismaClient
) {
  const findInput = {
    where: {
      id: jobId,
    },
    include: { lineItems: true },
  };

  const existingJob = (await jobCrud.findUnique(
    findInput,
    tx
  )) as Prisma.JobGetPayload<typeof findInput> | null;

  if (!existingJob) {
    throw new JobNotFoundException();
  }

  if (!isOneItemIncluded([...existingJob.lineItems, ...lineItems])) {
    throw new OneLineItemMustBeIncludedException();
  }

  return existingJob;
}

function isOneItemIncluded(
  items: { id: string; includedInJob: boolean }[]
): boolean {
  const itemsIncludedMap = new Map<string, boolean>();
  for (const item of items) {
    itemsIncludedMap.set(item.id, item.includedInJob);
  }

  for (const itemIncluded of itemsIncludedMap.values()) {
    if (itemIncluded) {
      return true;
    }
  }

  return false;
}
