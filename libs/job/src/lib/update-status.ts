import { JobStatus, JobVersionStatus } from '@prisma/client';

import * as jobCrud from '@squaredash/crud/job';
import { createJob, getByIdWithMeta } from '@squaredash/job';
import * as jobHistoryEventService from '@squaredash/job-history-event';
import { JobHistoryEventType } from '@squaredash/job-history-event';

import { findLatestJobVersion } from './find-latest-version';

export async function updateStatus(
  versionId: string,
  userId: string,
  newStatus: JobStatus
) {
  const latestVersion = await findLatestJobVersion(versionId);

  if (!latestVersion) {
    return null;
  }

  const createdJob = await createJob({
    insuranceScopeId: latestVersion.insuranceScopeId,
    creatorId: userId,
    versionPayload: {
      versionId,
      versionStatus: JobVersionStatus.SUBMITTED,
    },
  });
  await jobCrud.update({
    where: {
      id: createdJob.id,
    },
    data: {
      status: newStatus,
    },
  });
  await jobHistoryEventService.createJobHistoryEvent({
    userId,
    versionId,
    eventType: JobHistoryEventType.STATUS_UPDATED,
    data: {
      old: createdJob.status,
      new: newStatus,
    },
    jobId: createdJob.id,
  });

  return getByIdWithMeta(createdJob.id);
}
