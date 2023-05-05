import { JobVersionStatus } from '@prisma/client';

export interface CreateJobPayload {
  insuranceScopeId: string;
  creatorId: string;
  versionPayload?: CreateJobVersionPayload;
}

export interface CreateJobVersionPayload {
  versionId: string;
  versionStatus: JobVersionStatus;
}
