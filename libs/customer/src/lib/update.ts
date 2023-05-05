import { UserNotFoundError, userRepository } from '@squaredash/user';

import {
  CustomerCannotBeParentCustomerError,
  CustomerNotFoundError,
  EmailAlreadyInUseError,
  NoPermissionsToChangeDetailsError,
} from './errors';
import { handleUniqueConstraintError } from './handle-unique-constraint-error';
import { Customer, UpdateCustomerPayload } from './models';
import * as customerRepository from './repository/customer';

export async function update(
  id: string,
  userId: string,
  companyId: string,
  isCompanyUser: boolean,
  data: UpdateCustomerPayload
): Promise<Customer> {
  const customer = await customerRepository.find(
    { id },
    { responsibleMembers: true }
  );

  if (!customer || (companyId && companyId !== customer.companyId)) {
    throw new CustomerNotFoundError();
  }

  if (data.parent) {
    if (data.parent === id) {
      throw new CustomerCannotBeParentCustomerError();
    }

    const parentCustomer = await customerRepository.find({ id: data.parent });

    if (!parentCustomer || parentCustomer.parentId) {
      throw new CustomerCannotBeParentCustomerError();
    }
  }

  if (isCompanyUser && customer.responsibleMembers) {
    const hasPermissions = customer.responsibleMembers.some(
      (member) => member.userId === userId
    );

    if (!hasPermissions) {
      throw new NoPermissionsToChangeDetailsError();
    }
  }

  if (data.responsibleMembers) {
    const responsibleMembers = await userRepository.findByIds(
      data.responsibleMembers
    );

    if (responsibleMembers.length !== data.responsibleMembers.length) {
      throw new UserNotFoundError();
    }
  }

  if (typeof data.email === 'string') {
    const user = await userRepository.find({ email: data.email });

    if (user) {
      throw new EmailAlreadyInUseError();
    }
  }

  try {
    return await customerRepository.update(id, userId, data, customer);
  } catch (error) {
    handleUniqueConstraintError(error);
  }
}
