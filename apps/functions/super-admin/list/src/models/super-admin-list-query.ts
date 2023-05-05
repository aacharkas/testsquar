import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';

import {
  DEFAULT_SKIP,
  DEFAULT_TAKE,
  SORT_ORDER,
} from '@squaredash/shared/constants';

export class SuperAdminListQuery {
  @Transform(({ value }) => (value ? value : null))
  @IsOptional()
  @MinLength(3)
  search?: string = null;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : null))
  @Min(0)
  @Max(100)
  @IsOptional()
  take: number = DEFAULT_TAKE;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : null))
  @Min(0)
  @IsOptional()
  skip: number = DEFAULT_SKIP;

  @Transform(({ value }) => (value ? value : null))
  @IsString()
  @IsOptional()
  @IsIn(Object.values(SORT_ORDER))
  sortOrder: SORT_ORDER = SORT_ORDER.ASC;

  @Transform(({ value }) => (value ? value : null))
  @IsString()
  @IsOptional()
  @IsIn(['name'])
  sortCol: string = 'name';
}
