import * as customersService from '@squaredash/customer';
import * as usersService from '@squaredash/user';

export async function isEmailInUse(email: string): Promise<boolean> {
  const existingUser = await usersService.find({ email });
  const existingCustomer = await customersService.findByEmail(email);

  return Boolean(existingCustomer || existingUser);
}
