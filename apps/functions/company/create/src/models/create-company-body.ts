import { IsIn, IsOptional, IsString, Length } from 'class-validator';

import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';

export class CreateCompanyBody {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsString()
  @IsOptional()
  avatarId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  legalName?: string;

  @IsIn(Object.values(NUMBER_OF_EMPLOYEES))
  numberOfEmployees: NUMBER_OF_EMPLOYEES;

  @IsIn(Object.values(NUMBER_OF_INSURANCE_JOBS_PER_MONTH))
  numberOfInsuranceJobsPerMonth: NUMBER_OF_INSURANCE_JOBS_PER_MONTH;

  @IsIn(Object.values(COME_FROM))
  comeFrom: COME_FROM;
}
