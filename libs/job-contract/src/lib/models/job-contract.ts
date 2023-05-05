import { JobContract as JobContractEntity } from '@prisma/client';

export type JobContract = JobContractEntity & {
  fileSize: number;
  link: string;
};
