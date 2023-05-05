import { InsuranceScopeStatus } from '@prisma/client';
import { Expose, Transform } from 'class-transformer';
import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

import { DEFAULT_SKIP, DEFAULT_TAKE } from '@squaredash/shared/constants';

export class InsuranceScopeListQuery {
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
  customerIds?: string[];

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  insuranceCarrierIds?: string[];

  @IsDateString()
  @IsOptional()
  dateOfLossFrom?: string;

  @IsDateString()
  @IsOptional()
  dateOfLossTo?: string;

  @Transform(({ value }) => (value !== undefined ? Number(value) : null))
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0.0)
  @Max(999999.99)
  @IsOptional()
  rcvFrom?: number;

  @Transform(({ value }) => (value !== undefined ? Number(value) : null))
  @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
  @Min(0.0)
  @Max(999999.99)
  @IsOptional()
  rcvTo?: number;

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsString({ each: true })
  @IsOptional()
  @Expose()
  companyIds?: string[];

  @IsDateString()
  @IsOptional()
  createdAtFrom?: string;

  @IsDateString()
  @IsOptional()
  createdAtTo?: string;

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsString({ each: true })
  @IsOptional()
  status?: InsuranceScopeStatus[];
}
