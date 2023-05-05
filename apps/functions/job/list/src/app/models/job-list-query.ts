import { JobStatus } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

import { DEFAULT_SKIP, DEFAULT_TAKE } from '@squaredash/shared/constants';

export class JobListQuery {
  @Transform(({ value }) => (value ? value : undefined))
  @IsOptional()
  @MinLength(3)
  @Expose()
  search?: string;

  @Transform(({ value }) => (value ? Number(value) : undefined))
  @Min(0)
  @Max(100)
  @IsOptional()
  @Expose()
  take: number = DEFAULT_TAKE;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @Min(0)
  @IsOptional()
  @Expose()
  skip: number = DEFAULT_SKIP;

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  companyIds?: string[];

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  customerIds?: string[];

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  insuranceCarrierIds?: string[];

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsIn(Object.values(JobStatus), { each: true })
  @IsOptional()
  @Expose()
  statuses?: string[];

  @IsDateString()
  @IsOptional()
  dateOfLossFrom?: string;

  @IsDateString()
  @IsOptional()
  dateOfLossTo?: string;

  @IsDateString()
  @IsOptional()
  createdFrom?: string;

  @IsDateString()
  @IsOptional()
  createdTo?: string;

  @Transform(({ value }) => (value !== undefined ? Number(value) : null))
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0.0)
  @Max(999999.99)
  @IsOptional()
  loanFrom?: number;

  @Transform(({ value }) => (value !== undefined ? Number(value) : null))
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0.0)
  @Max(999999.99)
  @IsOptional()
  loanTo?: number;

  @Transform(({ value }) => (value !== undefined ? Number(value) : null))
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0.0)
  @Max(999999.99)
  @IsOptional()
  dueBalanceFrom?: number;

  @Transform(({ value }) => (value !== undefined ? Number(value) : null))
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0.0)
  @Max(999999.99)
  @IsOptional()
  dueBalanceTo?: number;
}
