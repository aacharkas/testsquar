import { CompanyStatus, Prisma } from '@prisma/client';

import { prisma } from '@squaredash/shared/db';

import { CompanyUpdate } from '../interfaces/company-update';

export async function update(id: string, data: CompanyUpdate): Promise<void> {
  const updatePayload: Prisma.CompanyUpdateInput = data;

  const onboarded =
    Boolean(data.numberOfEmployees) &&
    Boolean(data.numberOfInsuranceJobsPerMonth) &&
    Boolean(data.comeFrom);
  if (onboarded) {
    updatePayload.status = CompanyStatus.ACTIVE;
  }

  await prisma.company.update({
    data: updatePayload,
    where: {
      id,
    },
  });
}
