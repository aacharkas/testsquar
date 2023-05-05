import { Transform } from 'class-transformer';
import {
  IsBoolean,
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

export class ListClaimItemsQuery {
  @IsOptional()
  @MinLength(3)
  @Transform(({ value }) => value || undefined)
  search?: string;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : DEFAULT_TAKE))
  @Min(0)
  @Max(100)
  @IsOptional()
  take: number;

  @Transform(({ value }) => (value ? Number(value) : DEFAULT_SKIP))
  @IsNumber()
  @Min(0)
  @IsOptional()
  skip: number;

  @Transform(({ value }) => (value === 'true' ? true : false))
  @IsBoolean()
  @IsOptional()
  reviewed: boolean;

  @Transform(({ value }) => (value ? value : SORT_ORDER.ASC))
  @IsString()
  @IsOptional()
  @IsIn(Object.values(SORT_ORDER))
  sortOrder: SORT_ORDER;

  @Transform(({ value }) => (value ? value.split(',') : null))
  @IsOptional()
  @IsIn(['XACTIMATE', 'SYMBILITY', 'OTHER'], { each: true })
  sources?: ('XACTIMATE' | 'SYMBILITY' | 'OTHER')[] | null;
}
