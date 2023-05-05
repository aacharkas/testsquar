import { IsEnum } from 'class-validator';
import 'reflect-metadata';

import { COMPANY_STATUS } from '@squaredash/shared/constants';

export class UpdateStatusBody {
  @IsEnum([COMPANY_STATUS.INACTIVE, COMPANY_STATUS.ACTIVE])
  status: COMPANY_STATUS;
}
