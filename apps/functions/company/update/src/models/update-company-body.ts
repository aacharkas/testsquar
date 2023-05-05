import { IsIn, IsOptional, IsString } from 'class-validator';

import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';

export class UpdateCompanyBody {
  @IsString()
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  legalName?: string;
  @IsString()
  @IsOptional()
  avatarId?: string;

  @IsIn(Object.values(NUMBER_OF_EMPLOYEES))
  @IsOptional()
  numberOfEmployees?: NUMBER_OF_EMPLOYEES;

  @IsIn(Object.values(NUMBER_OF_INSURANCE_JOBS_PER_MONTH))
  @IsOptional()
  numberOfInsuranceJobsPerMonth?: NUMBER_OF_INSURANCE_JOBS_PER_MONTH;

  @IsIn(Object.values(COME_FROM))
  @IsOptional()
  comeFrom?: COME_FROM;
}
