import { IsIn, IsOptional, IsString, Length } from 'class-validator';

import {
  COME_FROM,
  NUMBER_OF_EMPLOYEES,
  NUMBER_OF_INSURANCE_JOBS_PER_MONTH,
} from '@squaredash/shared/constants';
import { IsValidEmail } from '@squaredash/shared/validators';

export class InviteCompanyBody {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsString()
  @Length(1, 50)
  ownerName: string;

  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  ownerEmail: string;

  @IsString()
  @IsOptional()
  avatarId?: string;

  @IsOptional()
  @IsString()
  @Length(1, 200)
  legalName?: string;

  @IsOptional()
  @IsIn(Object.values(NUMBER_OF_EMPLOYEES))
  numberOfEmployees: NUMBER_OF_EMPLOYEES | null;

  @IsOptional()
  @IsIn(Object.values(NUMBER_OF_INSURANCE_JOBS_PER_MONTH))
  numberOfInsuranceJobsPerMonth: NUMBER_OF_INSURANCE_JOBS_PER_MONTH | null;

  @IsOptional()
  @IsIn(Object.values(COME_FROM))
  comeFrom: COME_FROM | null;
}
