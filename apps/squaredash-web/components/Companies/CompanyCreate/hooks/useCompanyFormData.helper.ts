import { COMPANY_FIELDS } from '../CompanyForm.constants';
import type { TCompanyErrors, TCompanyForm } from '../CompanyForm.types';

export const checkCompanyFormError = (
  companyForm: TCompanyForm,
  formatError: (name: string) => string
): TCompanyErrors => {
  const errors = {};
  if (!companyForm[COMPANY_FIELDS.COMPANY_NAME])
    errors[COMPANY_FIELDS.COMPANY_NAME] = formatError('company name');
  if (!companyForm[COMPANY_FIELDS.OWNER_NAME])
    errors[COMPANY_FIELDS.OWNER_NAME] = formatError('owner`s full name');
  if (!companyForm[COMPANY_FIELDS.OWNER_EMAIL])
    errors[COMPANY_FIELDS.OWNER_EMAIL] = formatError('owner`s work email');
  return errors;
};

export const formatCreateData = (companyForm: TCompanyForm) => {
  return {
    [COMPANY_FIELDS.COMPANY_AVATAR]: companyForm[COMPANY_FIELDS.COMPANY_AVATAR],
    [COMPANY_FIELDS.COMPANY_NAME]: companyForm[COMPANY_FIELDS.COMPANY_NAME],
    [COMPANY_FIELDS.COMPANY_EMPLOYEES]:
      companyForm[COMPANY_FIELDS.COMPANY_EMPLOYEES] || null,
    [COMPANY_FIELDS.COMPANY_JOBS]:
      companyForm[COMPANY_FIELDS.COMPANY_JOBS] || null,
    [COMPANY_FIELDS.COMPANY_COME_FROM]:
      companyForm[COMPANY_FIELDS.COMPANY_COME_FROM] || null,
    [COMPANY_FIELDS.OWNER_NAME]: companyForm[COMPANY_FIELDS.OWNER_NAME],
    [COMPANY_FIELDS.OWNER_EMAIL]: companyForm[COMPANY_FIELDS.OWNER_EMAIL],
    [COMPANY_FIELDS.COMPANY_AVATAR]: companyForm[COMPANY_FIELDS.COMPANY_AVATAR],
  };
};
