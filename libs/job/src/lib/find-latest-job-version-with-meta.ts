import { PrismaClient } from '@prisma/client';

import { getByIdWithMeta } from '@squaredash/job';

import * as repository from './repository/job.repository';

export async function findLatestSubmittedJobVersion(
  versionId: string,
  tx?: PrismaClient
) {
  const job = await repository.findLatestSubmittedVersion(versionId, tx);

  return job ? getByIdWithMeta(job.id, tx) : null;
}
