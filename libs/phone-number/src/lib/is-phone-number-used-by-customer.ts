import { PrismaClient } from '@prisma/client';

import * as customerCrud from '@squaredash/crud/customer';

export async function isPhoneNumberUsedByCompanyCustomer(
  companyId: string,
  phoneNumber: string,
  tx?: PrismaClient
) {
  return Boolean(
    await customerCrud.findFirst(
      { where: { companyId, phone: phoneNumber } },
      tx
    )
  );
}
