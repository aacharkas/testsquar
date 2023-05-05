import { CompanyEmailTemplate, EmailTemplate } from '@prisma/client';
import * as ejs from 'ejs';
import * as path from 'node:path';

import * as emailTemplateCrudService from '@squaredash/crud/email-template';
import { NotFoundException } from '@squaredash/shared/util';

type Template = EmailTemplate & {
  companyEmailTemplate: CompanyEmailTemplate[];
};

export async function getById(emailTemplateId: string, companyId: string) {
  const templates: Template[] = await emailTemplateCrudService.findMany({
    where: { companyId: companyId },
  });

  const template: Template = templates.find(
    (template) => template.id === emailTemplateId
  );
  if (!template) {
    throw new NotFoundException('IM0053');
  }

  const htmlTemplate = await getHtmlTemplate(template);

  return {
    ...template,
    html: htmlTemplate,
  };
}

async function getHtmlTemplate(template: Template): Promise<string> {
  const companyEmailTemplate: CompanyEmailTemplate | undefined =
    template.companyEmailTemplate[0];

  const body = companyEmailTemplate?.customBody || template.defaultBody;
  const buttonText =
    companyEmailTemplate?.customButtonText || template.defaultButtonText;

  return ejs.renderFile(
    path.join(__dirname, 'assets', 'templates', 'email-template.ejs'),
    {
      body,
      buttonText,
    }
  );
}
