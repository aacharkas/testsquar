import { JobVersionStatus, PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function findLatestSubmittedVersion(
  versionId: string,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.job.findFirst({
    where: {
      versionId,
      versionStatus: JobVersionStatus.SUBMITTED,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findLatestJobVersion(versionId: string) {
  return prisma.job.findFirst({
    where: {
      versionId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function findPendingVersion(versionId: string) {
  return prisma.job.findFirst({
    where: {
      versionId,
      versionStatus: JobVersionStatus.PENDING,
    },
  });
}

export async function submitPendingVersion(jobId: string, tx?: PrismaClient) {
  const executor = tx ?? prisma;

  return executor.job.update({
    where: {
      id: jobId,
    },
    data: {
      versionStatus: JobVersionStatus.SUBMITTED,
    },
  });
}

export async function findByInsuranceScopeVersionId(
  insuranceScopeVersionId: string,
  tx?: PrismaClient
) {
  const executor = tx ?? prisma;

  return executor.job.findFirst({
    where: {
      insuranceScope: {
        versionId: insuranceScopeVersionId,
      },
      versionStatus: JobVersionStatus.SUBMITTED,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
