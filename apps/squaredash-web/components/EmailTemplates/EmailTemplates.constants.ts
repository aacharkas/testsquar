export enum EMAIL_TEMPLATE_ACTIONS {
  VIEW,
  EDIT,
}

export const EMAIL_TEMPLATES_API = 'email-template';

export const TEMPLATE_FIELDS = {
  ID: 'id',
  NAME: 'name',
  SUBJECT: 'subject',
  BODY: 'body',
  BUTTON_TEXT: 'buttonText',
  DEFAULT_SUBJECT: 'defaultSubject',
  DEFAULT_BODY: 'defaultBody',
  DEFAULT_BUTTON_TEXT: 'defaultButtonText',
  HTML: 'html',
};

export const DEFAULT_TEMPLATE = {
  [TEMPLATE_FIELDS.ID]: '',
  [TEMPLATE_FIELDS.NAME]: '',
  [TEMPLATE_FIELDS.SUBJECT]: '',
  [TEMPLATE_FIELDS.BODY]: '',
  [TEMPLATE_FIELDS.BUTTON_TEXT]: '',
  [TEMPLATE_FIELDS.DEFAULT_SUBJECT]: '',
  [TEMPLATE_FIELDS.DEFAULT_BODY]: '',
  [TEMPLATE_FIELDS.DEFAULT_BUTTON_TEXT]: '',
  [TEMPLATE_FIELDS.HTML]: '',
};
