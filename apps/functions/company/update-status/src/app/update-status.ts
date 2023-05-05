import * as companyCrudService from '@squaredash/crud/company';
import * as tokenCrudService from '@squaredash/crud/token';
import * as userCrudService from '@squaredash/crud/user';
import * as messageQueueService from '@squaredash/message-queue';
import { TOPIC } from '@squaredash/message-queue';
import { COMPANY_STATUS, USER_ROLE } from '@squaredash/shared/constants';
import {
  BadRequestException,
  NotFoundException,
  TemplateIds,
} from '@squaredash/shared/util';

export async function updateStatus(
  companyId: string,
  status: COMPANY_STATUS
): Promise<void> {
  const company = await companyCrudService.find({ id: companyId });
  if (!company) {
    throw new NotFoundException('IM0053');
  }

  if (company.status === status) {
    throw new BadRequestException(`Company already has ${status} status`);
  }

  await companyCrudService.update({ id: companyId }, { status });

  if (status === COMPANY_STATUS.INACTIVE) {
    await eraseCompanyUserSessions(companyId);
  }

  await sendStatusChangeEmailNotification(company.id, company.name, status);
}

async function eraseCompanyUserSessions(companyId: string): Promise<void> {
  const users = await userCrudService.findMany({ where: { companyId } });
  const userIds = users.map((user) => user.id);

  await tokenCrudService.deleteMany({ userId: { in: userIds } });
}

async function sendStatusChangeEmailNotification(
  companyId: string,
  companyName: string,
  status: COMPANY_STATUS
): Promise<void> {
  const owners = await userCrudService.findMany({
    where: { companyId, role: USER_ROLE.COMPANY_OWNER },
  });
  const messages = owners.map((owner) => ({
    recipient: owner.email,
    templateId: getNotificationTemplateId(status),
    data: {
      companyName: companyName,
    },
  }));

  return messageQueueService.addBatch(TOPIC.EMAIL_NOTIFICATION, messages);
}

function getNotificationTemplateId(status: COMPANY_STATUS): string {
  return status === COMPANY_STATUS.ACTIVE
    ? TemplateIds.companyActivated
    : TemplateIds.companySuspended;
}
