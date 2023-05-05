import { CustomContext } from '@squaredash/shared/interfaces';

import { JobListQuery } from '../models/job-list-query';

export const getCompanyIds = (
  context: CustomContext,
  query: JobListQuery
): string[] | undefined => {
  if (context.user.companyId) {
    return [context.user.companyId];
  }

  return query.insuranceCarrierIds?.length
    ? query.insuranceCarrierIds
    : undefined;
};
