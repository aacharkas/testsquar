import { CompanyInvite } from '@squaredash/company';

import { InviteCompanyBody } from '../models/invite-company-body';

export const inviteCompanyBodyToInviteCompanyPayload = (
  inviteBody: InviteCompanyBody
): CompanyInvite => ({
  data: {
    name: inviteBody.name,
    legalName: inviteBody.legalName || inviteBody.name,
    numberOfEmployees: inviteBody.numberOfEmployees,
    numberOfInsuranceJobsPerMonth: inviteBody.numberOfInsuranceJobsPerMonth,
    comeFrom: inviteBody.comeFrom,
    avatarId: inviteBody.avatarId,
  },
  ownerName: inviteBody.ownerName,
  ownerEmail: inviteBody.ownerEmail,
});
