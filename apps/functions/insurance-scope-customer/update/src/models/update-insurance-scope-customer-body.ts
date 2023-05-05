import {
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { CustomerType } from '@squaredash/customer';
import { IsValidEmail } from '@squaredash/shared/validators';

export class UpdateInsuranceScopeCustomerBody {
  @IsString()
  @Length(1, 200)
  @IsOptional()
  displayName?: string;

  @IsIn(['INDIVIDUAL', 'BUSINESS'])
  @IsOptional()
  type?: CustomerType;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  firstName?: string;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  @IsOptional()
  email?: string;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  propertyAddress?: string;

  @IsString()
  @IsOptional()
  shippingAddress?: string;

  @IsUUID()
  @IsOptional()
  customerId?: string;
}
