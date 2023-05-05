import { Prisma } from '@prisma/client';

import * as repository from './lib/repository';

export async function findMany(
  args: Prisma.CompanyEmailTemplateFindManyArgs,
  tx?: Prisma.TransactionClient
) {
  return repository.findMany(args, tx);
}

export async function findCompanyEmailTemplate(
  args: Prisma.CompanyEmailTemplateFindFirstArgs,
  tx?: Prisma.TransactionClient
) {
  return repository.findCompanyEmailTemplate(args, tx);
}

export async function findEmailTemplate(
  args: Prisma.EmailTemplateFindFirstArgs,
  tx?: Prisma.TransactionClient
) {
  return repository.findEmailTemplate(args, tx);
}

export async function count(
  args: Prisma.EmailTemplateCountArgs,
  tx?: Prisma.TransactionClient
) {
  return repository.count(args, tx);
}

export async function upsert(
  args: Prisma.CompanyEmailTemplateUpsertArgs,
  tx?: Prisma.TransactionClient
) {
  return repository.upsert(args, tx);
}
