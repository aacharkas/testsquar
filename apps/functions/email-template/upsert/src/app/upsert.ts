import * as emailTemplateCrudService from '@squaredash/crud/email-template';
import { prisma } from '@squaredash/shared/db';
import { CustomContext } from '@squaredash/shared/interfaces';
import { NotFoundException } from '@squaredash/shared/util';

import { UpsertEmailTemplateBody } from '../models/upsert-email-template-body';

export async function upsert(
  body: UpsertEmailTemplateBody,
  context: CustomContext
): Promise<void> {
  await prisma.$transaction(async (tx) => {
    const emailTemplate = await emailTemplateCrudService.findEmailTemplate(
      { where: { templateId: body.templateId } },
      tx
    );
    if (!emailTemplate) {
      throw new NotFoundException('IM0053');
    }

    const companyEmailTemplate =
      await emailTemplateCrudService.findCompanyEmailTemplate(
        {
          where: {
            companyId: context.user.companyId,
            emailTemplateId: emailTemplate.id,
          },
        },
        tx
      );

    await emailTemplateCrudService.upsert(
      {
        where: {
          id: companyEmailTemplate?.id || '',
        },
        create: {
          customBody: body.customBody,
          customSubject: body.customSubject,
          customButtonText: body.customButtonText,
          company: {
            connect: {
              id: context.user.companyId,
            },
          },
          emailTemplate: {
            connect: {
              id: emailTemplate.id,
            },
          },
          createdBy: context.user.id,
          updatedBy: context.user.id,
        },
        update: {
          customBody: body.customBody,
          customSubject: body.customSubject,
          customButtonText: body.customButtonText,
          updatedBy: context.user.id,
        },
      },
      tx
    );
  });
}
