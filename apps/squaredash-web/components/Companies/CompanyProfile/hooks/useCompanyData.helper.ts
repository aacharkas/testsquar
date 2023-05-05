import { COMPANY_PROFILE_FIELDS } from '../CompanyProfile.constants';
import { TCompanyErrors, TCompanyFormDefault } from '../CompanyProfile.types';

export const checkCompanyFormError = (
  companyForm: TCompanyFormDefault,
  formatError: (name: string) => string
): TCompanyErrors => {
  const errors = {};
  if (!companyForm[COMPANY_PROFILE_FIELDS.COMPANY_NAME])
    errors[COMPANY_PROFILE_FIELDS.COMPANY_NAME] = formatError('company name');
  return errors;
};

// restruct get structure to form structure
export const formatGetData = (companyForm: object): TCompanyFormDefault => {
  return {
    [COMPANY_PROFILE_FIELDS.COMPANY_ID]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_ID],
    [COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_AVATAR_LINK],
    [COMPANY_PROFILE_FIELDS.COMPANY_AVATAR]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_AVATAR],
    [COMPANY_PROFILE_FIELDS.COMPANY_NAME]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_NAME],
    [COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME],
    [COMPANY_PROFILE_FIELDS.COMPANY_STATUS]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_STATUS],
    [COMPANY_PROFILE_FIELDS.COMPANY_EMPLOYEES]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_EMPLOYEES],
    [COMPANY_PROFILE_FIELDS.COMPANY_JOBS]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_JOBS],
    [COMPANY_PROFILE_FIELDS.COMPANY_COME_FROM]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_COME_FROM],
    [COMPANY_PROFILE_FIELDS.COMPANY_OWNERS]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS]?.rows,
    [COMPANY_PROFILE_FIELDS.COMPANY_OWNERS_COUNT]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_OWNERS]?.totalCount,
    [COMPANY_PROFILE_FIELDS.COMPANY_LOCATIONS]:
      companyForm?.[COMPANY_PROFILE_FIELDS.COMPANY_LOCATIONS],
  };
};

export const formatEditData = (
  originalCompany: object,
  companyForm: TCompanyFormDefault,
  queryCompanyId: boolean
): object => {
  const editResult = {};

  const compareMainValues = (name: string): void => {
    if (originalCompany[name] !== companyForm[name])
      editResult[name] = companyForm[name];
  };
  compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_NAME);
  compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_AVATAR);

  if (queryCompanyId) {
    compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_EMPLOYEES);
    compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_JOBS);
    compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_COME_FROM);
    compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME);
    compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_AVATAR);
  } else {
    compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_LEGAL_NAME);
    compareMainValues(COMPANY_PROFILE_FIELDS.COMPANY_AVATAR);
  }

  return editResult;
};
