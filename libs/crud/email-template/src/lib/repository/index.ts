import { Prisma, TechStatus } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

export async function findMany(
  args: Prisma.CompanyEmailTemplateFindManyArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.emailTemplate.findMany({
    include: getIncludeCompanyEmailTemplate(args),
    where: {
      techStatus: {
        not: TechStatus.DELETED,
      },
    },
  });
}

export async function findCompanyEmailTemplate(
  args: Prisma.CompanyEmailTemplateFindFirstArgsBase,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.companyEmailTemplate.findFirst({
    ...args,
    where: {
      ...args.where,
      techStatus: {
        not: TechStatus.DELETED,
      },
    },
  });
}

export async function findEmailTemplate(
  args: Prisma.EmailTemplateFindFirstArgsBase,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.emailTemplate.findFirst({
    ...args,
    where: {
      ...args.where,
      techStatus: {
        not: TechStatus.DELETED,
      },
    },
  });
}

function getIncludeCompanyEmailTemplate(
  args: Prisma.CompanyEmailTemplateFindManyArgs
) {
  if (!args.where?.companyId) {
    return undefined;
  }

  return {
    companyEmailTemplate: {
      where: {
        ...args.where,
        techStatus: {
          not: TechStatus.DELETED,
        },
      },
    },
  };
}
export async function count(
  args: Prisma.EmailTemplateCountArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.emailTemplate.count({
    ...args,
    where: {
      ...args.where,
      techStatus: {
        not: TechStatus.DELETED,
      },
    },
  });
}

export async function upsert(
  args: Prisma.CompanyEmailTemplateUpsertArgs,
  tx?: Prisma.TransactionClient
) {
  const client = tx || prisma;

  return client.companyEmailTemplate.upsert(args);
}
