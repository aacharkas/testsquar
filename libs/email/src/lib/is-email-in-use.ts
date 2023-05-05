import { PrismaClient } from '@prisma/client';

import * as customerCrud from '@squaredash/crud/customer';
import * as userCrud from '@squaredash/crud/user';

export async function isCustomerEmailInUse(
  email: string,
  companyId: string,
  tx?: PrismaClient
) {
  const existingUser = await userCrud.findFirst({ where: { email } }, tx);
  if (existingUser) {
    return true;
  }

  const existingCustomer = await customerCrud.findFirst(
    {
      where: { email, companyId },
    },
    tx
  );
  return Boolean(existingCustomer);
}
