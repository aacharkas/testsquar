import { FunctionSchemasGroup } from '../../types/function-schemas-group';
import { emailTemplateGetSchema } from './email-template-get.schema';
import { emailTemplateListSchema } from './email-template-list.schema';
import { emailTemplateUpsertSchema } from './email-template-upsert.schema';

export const emailTemplateSchemasGroup: FunctionSchemasGroup = {
  tag: {
    name: 'Email Template',
    description: 'Email Template Functions',
  },
  schemas: [
    emailTemplateListSchema,
    emailTemplateUpsertSchema,
    emailTemplateGetSchema,
  ],
};
