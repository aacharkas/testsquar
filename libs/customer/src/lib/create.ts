import { PrismaClient } from '@prisma/client';

import { UserNotFoundError, userRepository } from '@squaredash/user';

import {
  CustomerCannotBeParentCustomerError,
  EmailAlreadyInUseError,
} from './errors';
import { handleUniqueConstraintError } from './handle-unique-constraint-error';
import { CreateCustomerPayload, Customer } from './models';
import * as customerRepository from './repository/customer';

export async function create(
  data: CreateCustomerPayload,
  tx?: PrismaClient
): Promise<Customer> {
  const responsibleMembers = await userRepository.findByIds(
    data.responsibleMembers,
    tx
  );
  if (responsibleMembers.length !== data.responsibleMembers.length) {
    throw new UserNotFoundError();
  }

  if (data.parent) {
    const customer = await customerRepository.find(
      { id: data.parent },
      undefined,
      tx
    );

    if (!customer || customer.parentId) {
      throw new CustomerCannotBeParentCustomerError();
    }
  }

  const existingUser = await userRepository.find({ email: data.email }, tx);
  if (existingUser) {
    throw new EmailAlreadyInUseError();
  }

  try {
    return await customerRepository.create(data, tx);
  } catch (error) {
    handleUniqueConstraintError(error);
  }
}
