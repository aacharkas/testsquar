import { TEMPLATE_FIELDS } from '../../EmailTemplates.constants';
import { TTemplate } from '../../EmailTemplates.types';
import { TEMPLATE_CUSTOM_FIELDS } from '../EmailTemplateForm.constants';
import { TTemplateErrors, TTemplateForm } from '../EmailTemplateForm.types';

export const checkTemplateFormError = (
  templateForm: TTemplateForm,
  formatError: (name: string) => string
): TTemplateErrors => {
  const errors = {};
  if (!templateForm[TEMPLATE_FIELDS.SUBJECT])
    errors[TEMPLATE_CUSTOM_FIELDS.SUBJECT] = formatError('subject');
  if (!templateForm[TEMPLATE_FIELDS.BODY])
    errors[TEMPLATE_CUSTOM_FIELDS.BODY] = formatError('body');
  return errors;
};

export const formatEditData = (
  originalTemplate: TTemplate,
  templateForm: TTemplateForm
): object => {
  return {
    [TEMPLATE_CUSTOM_FIELDS.SUBJECT]: templateForm[TEMPLATE_FIELDS.SUBJECT],
    [TEMPLATE_CUSTOM_FIELDS.BODY]: templateForm[TEMPLATE_FIELDS.BODY],
    [TEMPLATE_CUSTOM_FIELDS.BUTTON_TEXT]:
      templateForm[TEMPLATE_FIELDS.BUTTON_TEXT] || null,
    [TEMPLATE_CUSTOM_FIELDS.TEMPLATE_ID]: originalTemplate.templateId,
  };
};
