import { JobStatus, JobVersionStatus, PrismaClient } from '@prisma/client';

import * as insuranceScopeService from '@squaredash/crud/insurance-scope';
import { InsuranceScopeNotFoundError } from '@squaredash/crud/insurance-scope';
import * as jobCrud from '@squaredash/crud/job';
import {
  CreateJobPayload,
  createJob,
  findLatestSubmittedJobVersion,
  getLineItemsDifference,
  submitJob,
} from '@squaredash/job';
import * as jobHistoryEventService from '@squaredash/job-history-event';
import { JobHistoryEventType } from '@squaredash/job-history-event';

import * as repository from './repository/job.repository';

export async function handleScopeVerification(
  insuranceScopeId: string,
  userId: string,
  tx?: PrismaClient
) {
  const scope = await insuranceScopeService.findUnique(
    {
      where: { id: insuranceScopeId },
    },
    tx
  );

  if (!scope) {
    throw new InsuranceScopeNotFoundError();
  }

  const existingJob = await repository.findByInsuranceScopeVersionId(
    scope.versionId,
    tx
  );

  const createJobPayload: CreateJobPayload = {
    insuranceScopeId,
    creatorId: userId,
  };

  if (existingJob) {
    createJobPayload.versionPayload = {
      versionId: existingJob.versionId,
      versionStatus: JobVersionStatus.PENDING,
    };
  }

  const createdJob = await createJob(createJobPayload, tx);

  if (existingJob) {
    await jobHistoryEventService.createJobHistoryEvent(
      {
        userId,
        versionId: createdJob.versionId,
        eventType: JobHistoryEventType.NEW_INSURANCE_SCOPE_UPLOADED,
        jobId: createdJob.id,
      },
      tx
    );

    const oldVersion = (await findLatestSubmittedJobVersion(
      createdJob.versionId,
      tx
    ))!;

    const lineItemsDiffs = getLineItemsDifference(oldVersion, createdJob);
    const lineItemsChanged =
      Boolean(lineItemsDiffs.changed.length) ||
      Boolean(lineItemsDiffs.deleted.length) ||
      Boolean(lineItemsDiffs.added.length);

    if (!lineItemsChanged) {
      return submitJob(createdJob.id, tx);
    } else {
      await jobCrud.update(
        {
          where: {
            id: existingJob.id,
          },
          data: {
            status: JobStatus.UPDATE_REQUIRED,
          },
        },
        tx
      );
    }
  }

  return createdJob;
}
