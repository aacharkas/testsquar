import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';
import { COMPANY_STATUS } from '@squaredash/shared/constants';
import { List } from '@squaredash/shared/interfaces';

import { CompanyLocation } from '../interfaces';

export interface CompanyWithMetaAdminResponse {
  id: string;
  name: string;
  legalName: string;
  status: COMPANY_STATUS;
  numberOfEmployees: NUMBER_OF_EMPLOYEES;
  numberOfInsuranceJobsPerMonth: NUMBER_OF_INSURANCE_JOBS_PER_MONTH;
  comeFrom: COME_FROM;
  locations: CompanyLocation[];
  owners: List<{
    id: string;
    name: string;
  }>;
  avatar: string;
}
