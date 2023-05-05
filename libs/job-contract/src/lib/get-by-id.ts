import { TechStatus } from '@prisma/client';

import * as jobContractCrud from '@squaredash/crud/job-contract';

import { getJobContractByEntity } from './get-job-contract-by-entity';
import { JobContract } from './models/job-contract';

export async function getById(id: string): Promise<JobContract | null> {
  const jobContract = await jobContractCrud.findUnique({
    where: {
      id,
    },
  });

  if (!jobContract) {
    return null;
  }

  if (jobContract.techStatus === TechStatus.DELETED) {
    return null;
  }

  return getJobContractByEntity(jobContract);
}
