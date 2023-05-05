// string part used to connect to backend
export const COMPANY_SIGNUP_FIELDS = {
  COMPANY_NAME: 'name',
  PEOPLE_AMOUNT: 'numberOfEmployees',
  JOBS_AMOUNT: 'numberOfInsuranceJobsPerMonth',
  AWARENESS: 'comeFrom',
};

export const DEFAULT_COMPANY_SIGNUP = {
  [COMPANY_SIGNUP_FIELDS.COMPANY_NAME]: '',
  [COMPANY_SIGNUP_FIELDS.PEOPLE_AMOUNT]: '',
  [COMPANY_SIGNUP_FIELDS.JOBS_AMOUNT]: '',
  [COMPANY_SIGNUP_FIELDS.AWARENESS]: '',
};

export const COMPANY_SIGNUP_API = 'company';
export const VERIFY_EMAIL_API = 'auth/verify-email';
