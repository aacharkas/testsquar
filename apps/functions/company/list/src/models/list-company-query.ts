import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
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
import { SORTABLE_COMPANY_COLUMNS } from '@squaredash/shared/constants';

export class ListCompanyQuery {
  @Transform(({ value }) => value || undefined)
  @IsOptional()
  @MinLength(3)
  search?: string;

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

  @Transform(({ value }) => value ?? SORT_ORDER.ASC)
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(SORT_ORDER))
  sortOrder: SORT_ORDER = SORT_ORDER.ASC;

  @Transform(({ value }) => value ?? SORTABLE_COMPANY_COLUMNS.NAME)
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(SORTABLE_COMPANY_COLUMNS))
  sortCol: SORTABLE_COMPANY_COLUMNS = SORTABLE_COMPANY_COLUMNS.NAME;
}
