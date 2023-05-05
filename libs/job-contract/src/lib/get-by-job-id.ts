import { TechStatus } from '@prisma/client';

import * as jobContractCrud from '@squaredash/crud/job-contract';

import { getJobContractByEntity } from './get-job-contract-by-entity';
import { JobContract } from './models/job-contract';

export async function getByJobId(jobId: string): Promise<JobContract[]> {
  const jobContracts = await jobContractCrud.findMany({
    where: {
      jobId,
      techStatus: {
        not: TechStatus.DELETED,
      },
    },
  });

  return Promise.all(jobContracts.map(getJobContractByEntity));
}
