import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

import { DEFAULT_SKIP, DEFAULT_TAKE } from '@squaredash/shared/constants';

export class EmailTemplateListQuery {
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
}
