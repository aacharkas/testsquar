import { Exclude, Transform } from 'class-transformer';
import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
  ValidateIf,
} from 'class-validator';

import { CustomerType } from '@squaredash/customer';
import {
  CUSTOMER_CATEGORY,
  DEFAULT_SKIP,
  DEFAULT_TAKE,
  SORTABLE_CUSTOMER_COLUMNS,
  SORT_ORDER,
} from '@squaredash/shared/constants';

export class ListCustomerQuery {
  @Transform(({ value }) => (value ? value : undefined))
  @IsOptional()
  @MinLength(3)
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
  @IsIn(Object.values(SORTABLE_CUSTOMER_COLUMNS))
  sortCol: SORTABLE_CUSTOMER_COLUMNS = SORTABLE_CUSTOMER_COLUMNS.DISPLAY_NAME;

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsString({ each: true })
  @IsOptional()
  @IsIn(Object.values(CUSTOMER_CATEGORY), { each: true })
  categories?: CUSTOMER_CATEGORY[];

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsOptional()
  @IsString({ each: true })
  responsibleMembers?: string[];

  @Transform(({ value }) => (value ? value.split(',') : undefined))
  @IsOptional()
  @IsString({ each: true })
  parents?: string[];

  @IsOptional()
  @IsString()
  @IsIn(['INDIVIDUAL', 'BUSINESS'])
  type?: CustomerType;

  @ValidateIf((obj) => obj.isUserSuperAdmin)
  @IsString()
  companyId: string;

  @Exclude({ toPlainOnly: true })
  isUserSuperAdmin: boolean;
}
