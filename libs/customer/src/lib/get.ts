import { PrismaClient } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import {
  CustomerNotFoundError,
  NoPermissionsToChangeDetailsError,
} from './errors';
import { Customer, CustomerWithMeta } from './models';
import * as customerRepository from './repository/customer';

export async function getByIdWithMeta(
  id: string,
  companyId: string,
  userId: string,
  isCompanyUser: boolean
): Promise<CustomerWithMeta> {
  const customer = await customerRepository.getByIdWithMeta(id);

  if (!customer || (companyId && companyId !== customer.companyId)) {
    throw new CustomerNotFoundError();
  }

  if (isCompanyUser && customer.responsibleMembers) {
    const hasPermissions = customer.responsibleMembers.some(
      (member) => member.id === userId
    );

    if (!hasPermissions) {
      throw new NoPermissionsToChangeDetailsError();
    }
  }

  return customer;
}

export async function findByEmail(email: string) {
  return customerRepository.findByEmail(email);
}

export async function findByDisplayName(
  displayName: string,
  tx?: PrismaClient
): Promise<Customer | null> {
  return customerRepository.findByDisplayName(displayName, tx);
}

export const findById = (id: string, tx?: PrismaClient) => {
  const executor = tx ?? prisma;
  return executor.customer.findUnique({ where: { id } });
};
