import { getByIdWithMeta } from '@squaredash/job';

import * as repository from './repository/job.repository';

export async function findLatestJobVersion(versionId: string) {
  const job = await repository.findLatestJobVersion(versionId);

  return job ? getByIdWithMeta(job.id) : null;
}
