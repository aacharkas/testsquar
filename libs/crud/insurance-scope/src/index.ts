import { Prisma, PrismaClient } from '@prisma/client';

import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext, List, Nullable } from '@squaredash/shared/interfaces';
import { ForbiddenException } from '@squaredash/shared/util';

import { InsuranceScopeNotFoundError } from './lib/errors';
import { InsuranceScopeWithMeta } from './lib/models';
import { InsuranceScopeListItem } from './lib/models';
import { InsuranceScopeListParams } from './lib/models/InsuranceScopeListParams';
import { InsuranceScopeFindByOptions } from './lib/models/insurance-scope-find-by-options';
import * as repository from './lib/repository';

export async function validateAndGetInsuranceScope(
  insuranceScopeId: string,
  context: CustomContext,
  tx?: PrismaClient
): Promise<InsuranceScopeWithMeta> {
  const insuranceScope = await findWithMeta(
    {
      id: insuranceScopeId,
    },
    tx
  );

  if (context.user.companyId !== insuranceScope.companyId) {
    throw new ForbiddenException(
      `User don't have an access to scope with id ${insuranceScope.id}`
    );
  }

  // Company User can only verify scopes, to which he is assigned as responsible
  if (
    context.user.role === USER_ROLE.COMPANY_USER &&
    !insuranceScope.customer.responsibleUserIds.includes(context.user.id)
  ) {
    throw new ForbiddenException(
      `User is not a responsible user for the scope with id ${insuranceScope.id}`
    );
  }

  return insuranceScope;
}

export async function findUnique(
  args: Prisma.InsuranceScopeFindUniqueArgs,
  tx?: PrismaClient
) {
  return repository.findUnique(args, tx);
}

export async function findById(
  id: string,
  include?: Prisma.InsuranceScopeInclude,
  tx?: PrismaClient
) {
  return repository.findById(id, include, tx);
}

export async function findByIdWithResponsibleMembers(insuranceScopeId: string) {
  return repository.findByIdWithCustomerResponsibleMembers(insuranceScopeId);
}

export async function findMany(
  searchParams: InsuranceScopeListParams
): Promise<List<InsuranceScopeListItem>> {
  return repository.findMany(searchParams);
}

export async function findWithMeta(
  where: Prisma.InsuranceScopeViewWhereInput,
  tx?: PrismaClient
): Promise<InsuranceScopeWithMeta> {
  const insuranceScope = await repository.findWithMeta(where, tx);

  if (!insuranceScope) {
    throw new InsuranceScopeNotFoundError();
  }

  return insuranceScope;
}

export async function findExistedVersion(
  options: InsuranceScopeFindByOptions
): Promise<Nullable<InsuranceScopeListItem>> {
  return repository.findExistedVersion(options);
}

export async function create(
  args: Prisma.InsuranceScopeCreateArgs,
  tx?: PrismaClient
) {
  return repository.create(args, tx);
}

export async function update(
  args: Prisma.InsuranceScopeUpdateArgs,
  tx?: PrismaClient
) {
  return repository.update(args, tx);
}

export * from './lib/models';
export * from './lib/errors';
