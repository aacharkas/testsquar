import { getByIdWithMeta } from './get-by-id-with-meta';
import * as jobRepository from './repository/job.repository';

export async function findPendingVersion(versionId: string) {
  const job = await jobRepository.findPendingVersion(versionId);

  return job ? getByIdWithMeta(job.id) : null;
}
