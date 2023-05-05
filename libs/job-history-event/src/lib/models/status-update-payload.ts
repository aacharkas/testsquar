import { JobStatus } from '@prisma/client';

export interface StatusUpdatePayload {
  old: JobStatus;
  new: JobStatus;
}
