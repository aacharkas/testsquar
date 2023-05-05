import {
  COME_FROM,
  COMPANY_STATUS,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';
import { List } from '@squaredash/shared/interfaces';

import { CompanyLocation } from '../interfaces';

export interface CompanyWithMeta {
  id: string;
  name: string;
  legalName: string;
  numberOfEmployees: NUMBER_OF_EMPLOYEES;
  numberOfInsuranceJobsPerMonth: NUMBER_OF_INSURANCE_JOBS_PER_MONTH;
  comeFrom: COME_FROM;
  locations: CompanyLocation[];
  status: COMPANY_STATUS;
  owners: List<{
    id: string;
    name: string;
  }>;
  avatar: string;
}
