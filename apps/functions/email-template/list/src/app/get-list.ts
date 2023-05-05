import { EmailTemplate, PrismaClient } from '@prisma/client';

import * as emailTemplateCrudService from '@squaredash/crud/email-template';
import { prisma } from '@squaredash/shared/db';
import { List } from '@squaredash/shared/interfaces';

import { EmailTemplateListQuery } from '../models/email-template-list-query';

export async function getList(
  query: EmailTemplateListQuery,
  companyId: string
): Promise<List<EmailTemplate>> {
  return prisma.$transaction<List<EmailTemplate>>(async (tx: PrismaClient) => {
    const [templates, templatesCount] = await Promise.all([
      emailTemplateCrudService.findMany(
        { where: { companyId: companyId } },
        tx
      ),
      emailTemplateCrudService.count({}, tx),
    ]);

    return {
      rows: templates,
      totalCount: templatesCount,
    };
  });
}
