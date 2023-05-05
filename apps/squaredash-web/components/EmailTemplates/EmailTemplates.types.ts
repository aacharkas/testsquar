import { EMAIL_TEMPLATE_ACTIONS } from './EmailTemplates.constants';

export type TTemplate = {
  id: string;
  name: string;
  defaultSubject: string;
  defaultBody: string;
  defaultButtonText: string;
  companyEmailTemplate: TCustomTemplate[];
  createdAt: string;
  techStatus: string;
  templateId: string;
  updatedAt: string;
  customFields;
  html: string;
};

export type TCustomTemplate = {
  companyId: string;
  customSubject: string;
  customBody: string;
  customButtonText: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  techStatus: string;
  id: string;
  emailTemplateId: string;
};

export type TDropdownItem = {
  href: string;
  title: string;
  type?: EMAIL_TEMPLATE_ACTIONS;
  id?: string;
};
