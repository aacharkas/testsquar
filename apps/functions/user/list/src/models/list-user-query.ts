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

import {
  DEFAULT_SKIP,
  DEFAULT_TAKE,
  SORT_ORDER,
} from '@squaredash/shared/constants';
import { USER_ROLE, USER_STATUS } from '@squaredash/shared/constants';
import { SORTABLE_USER_COLUMNS } from '@squaredash/shared/constants';

export class ListUserQuery {
  @Transform(({ value }) => (value ? value : null))
  @IsOptional()
  @MinLength(3)
  search?: string = null;

  @ValidateIf((obj) => !obj.isUserAdmin)
  @Transform(({ value }) => (value ? value.split(',') : null))
  @IsOptional()
  @IsIn(
    [USER_ROLE.COMPANY_USER, USER_ROLE.COMPANY_ADMIN, USER_ROLE.COMPANY_OWNER],
    { each: true }
  )
  roles?: USER_ROLE[] | null;

  @Transform(({ value }) => (value ? value.split(',') : null))
  @IsOptional()
  @IsIn(Object.values(USER_STATUS), { each: true })
  statuses?: USER_STATUS[] | null;

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
  @IsIn(Object.values(SORTABLE_USER_COLUMNS))
  sortCol: SORTABLE_USER_COLUMNS = SORTABLE_USER_COLUMNS.NAME;

  @ValidateIf((obj) => obj.isUserSuperAdmin)
  @IsString()
  companyId: string;

  @Exclude()
  isUserSuperAdmin: boolean;

  @Exclude()
  isUserAdmin: boolean;
}
