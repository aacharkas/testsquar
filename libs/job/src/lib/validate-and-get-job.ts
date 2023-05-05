import * as customerUserCrud from '@squaredash/crud/customer-user';
import { USER_ROLE } from '@squaredash/shared/constants';
import { CustomContext } from '@squaredash/shared/interfaces';
import { ForbiddenException, NotFoundException } from '@squaredash/shared/util';

import { getByIdWithMeta } from './get-by-id-with-meta';

export async function validateAndGetJob(
  jobId: string,
  user: CustomContext['user']
) {
  const job = await getByIdWithMeta(jobId);
  if (!job) {
    throw new NotFoundException('IM0053');
  }

  if (job.insuranceScope.companyId !== user.companyId) {
    throw new ForbiddenException('User can only update jobs of its company');
  }

  const customerUsers = await customerUserCrud.findMany({
    where: { customerId: job.insuranceScope.customerId },
  });
  const responsibleMembersIds = customerUsers.map(
    (relation) => relation.userId
  );
  if (
    user.role === USER_ROLE.COMPANY_USER &&
    !responsibleMembersIds.includes(user.id)
  ) {
    throw new ForbiddenException(
      'User can only interact with jobs he is assigned as responsible'
    );
  }

  return job;
}
