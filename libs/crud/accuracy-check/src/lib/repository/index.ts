import { Prisma } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function findMany(
  args: Prisma.AccuracyCheckRunFindManyArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.accuracyCheckRun.findMany(args);
}

export async function find(
  args: Prisma.AccuracyCheckRunFindUniqueArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.accuracyCheckRun.findUnique(args);
}

export async function findFirst(
  args: Prisma.AccuracyCheckRunFindFirstArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.accuracyCheckRun.findFirst(args);
}

export async function create(
  args: Prisma.AccuracyCheckRunCreateArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.accuracyCheckRun.create(args);
}

export async function update(
  args: Prisma.AccuracyCheckRunUpdateArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.accuracyCheckRun.update(args);
}

export async function deleteMany(
  args: Prisma.AccuracyCheckRunDeleteManyArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.accuracyCheckRun.deleteMany(args);
}

export async function createManyDocuments(
  args: Prisma.DocumentAccuracyCreateManyArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.documentAccuracy.createMany(args);
}

export async function createDocument(
  args: Prisma.DocumentAccuracyCreateArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.documentAccuracy.create(args);
}

export async function updateDocument(
  args: Prisma.DocumentAccuracyUpdateArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.documentAccuracy.update(args);
}
