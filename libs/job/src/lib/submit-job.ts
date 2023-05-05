import { PrismaClient } from '@prisma/client';

import { getByIdWithMeta } from '@squaredash/job';

import * as jobsRepository from './repository/job.repository';

export async function submitJob(jobId: string, tx?: PrismaClient) {
  const updatedJob = await jobsRepository.submitPendingVersion(jobId, tx);

  if (!updatedJob) {
    return null;
  }

  return getByIdWithMeta(jobId, tx);
}
