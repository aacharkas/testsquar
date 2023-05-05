import { CustomerNotFoundError } from './errors';
import * as customerRepository from './repository/customer';

export async function deleteCustomer(
  id: string,
  userId: string,
  companyId?: string
): Promise<void> {
  const customer = await customerRepository.find({ id });

  if (!customer || (companyId && companyId !== customer.companyId)) {
    throw new CustomerNotFoundError();
  }

  // TODO: check if the customer has active insurance scopes/jobs.

  await customerRepository.deleteCustomer(id, userId);
}
