import { Expose, Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min, MinLength } from 'class-validator';

import { DEFAULT_SKIP, DEFAULT_TAKE } from '@squaredash/shared/constants';

export class UnitOfMeasurementListQuery {
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
}
