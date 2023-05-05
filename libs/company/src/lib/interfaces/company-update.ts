import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';

export interface CompanyUpdate {
  name?: string;
  legalName?: string;
  avatarId?: string;
  numberOfEmployees?: NUMBER_OF_EMPLOYEES;
  numberOfInsuranceJobsPerMonth?: NUMBER_OF_INSURANCE_JOBS_PER_MONTH;
  comeFrom?: COME_FROM;
}
