import { Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import {
  DEFAULT_SKIP,
  DEFAULT_TAKE,
  SORT_ORDER,
} from '@squaredash/shared/constants';

import { SORTABLE_INSURANCE_CARRIER_COLUMNS } from '../app/constants/sortable-insurance-carrier-columns';

export class ListInsuranceCarrierQuery {
  @Transform(({ value }) => (value ? value : undefined))
  @IsOptional()
  search?: string;

  @Transform(({ value }) => (value ? Number(value) : undefined))
  @Min(0)
  @Max(100)
  @IsOptional()
  take: number = DEFAULT_TAKE;

  @IsNumber()
  @Transform(({ value }) => (value ? Number(value) : undefined))
  @Min(0)
  @IsOptional()
  skip: number = DEFAULT_SKIP;

  @Transform(({ value }) => (value ? value : undefined))
  @IsString()
  @IsOptional()
  @IsIn(Object.values(SORT_ORDER))
  sortOrder: SORT_ORDER = SORT_ORDER.ASC;

  @Transform(({ value }) => (value ? value : undefined))
  @IsString()
  @IsOptional()
  @IsIn(Object.values(SORTABLE_INSURANCE_CARRIER_COLUMNS))
  sortCol: SORTABLE_INSURANCE_CARRIER_COLUMNS =
    SORTABLE_INSURANCE_CARRIER_COLUMNS.NAME;
}
