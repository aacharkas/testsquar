import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../apps/squaredash-web/constants/permissions';
import { ROUTES } from '../../../../apps/squaredash-web/constants/routes';
import {
  EMAIL_TEMPLATE_ACTIONS,
  TEMPLATE_FIELDS,
} from './EmailTemplates.constants';
import { TTemplate } from './EmailTemplates.types';

export const getItemDropdowns = (id, t) => {
  return [
    {
      href: '',
      title: t('view'),
      type: EMAIL_TEMPLATE_ACTIONS.VIEW,
      permitAction: PERMISSION_ACTIONS.GET,
      permitUser: PERMISSIONS.EMAIL_TEMPLATES,
      id,
    },
    {
      href: `/${ROUTES.EMAIL_TEMPLATE}?id=${id}`,
      title: t('edit'),
      type: EMAIL_TEMPLATE_ACTIONS.EDIT,
      permitAction: PERMISSION_ACTIONS.UPDATE,
      permitUser: PERMISSIONS.EMAIL_TEMPLATES,
      id,
    },
  ];
};

export const getTemplateData = (template: TTemplate) => {
  let templateData = {
    [TEMPLATE_FIELDS.ID]: template?.id,
    [TEMPLATE_FIELDS.DEFAULT_SUBJECT]: template?.defaultSubject,
    [TEMPLATE_FIELDS.DEFAULT_BODY]: template?.defaultBody,
    [TEMPLATE_FIELDS.DEFAULT_BUTTON_TEXT]: template?.defaultButtonText,
    [TEMPLATE_FIELDS.HTML]: template?.html,
  };
  if (template?.companyEmailTemplate?.length > 0) {
    const customTemplate = template?.companyEmailTemplate[0];
    templateData = {
      ...templateData,
      [TEMPLATE_FIELDS.NAME]: template?.name,
      [TEMPLATE_FIELDS.SUBJECT]: customTemplate?.customSubject,
      [TEMPLATE_FIELDS.BODY]: customTemplate?.customBody,
      [TEMPLATE_FIELDS.BUTTON_TEXT]: customTemplate?.customButtonText,
    };
  } else {
    templateData = {
      ...templateData,
      [TEMPLATE_FIELDS.NAME]: template?.name,
      [TEMPLATE_FIELDS.SUBJECT]: template?.defaultSubject,
      [TEMPLATE_FIELDS.BODY]: template?.defaultBody,
      [TEMPLATE_FIELDS.BUTTON_TEXT]: template?.defaultButtonText,
    };
  }

  return templateData;
};
