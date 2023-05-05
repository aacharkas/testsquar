import { List } from '@squaredash/shared/interfaces';

import { Customer, ListCustomerPayload } from './models';
import * as customerRepository from './repository/customer';

export async function list(
  searchOptions: ListCustomerPayload
): Promise<List<Customer>> {
  return customerRepository.list(searchOptions);
}
