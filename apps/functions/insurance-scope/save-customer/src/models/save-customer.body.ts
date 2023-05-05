import { Type } from 'class-transformer';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import 'reflect-metadata';

import { SaveCustomerDetailsBody } from './save-customer-details.body';

export class SaveCustomerBody {
  @IsOptional()
  @Type(() => SaveCustomerDetailsBody)
  @ValidateNested()
  customerDetails?: SaveCustomerDetailsBody | null;

  @IsOptional()
  @IsString()
  customerId?: string | null;
}
