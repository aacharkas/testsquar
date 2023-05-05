import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

import { IsValidEmail } from '@squaredash/shared/validators';

export class UpdateInsuranceScopeCarrierBody {
  @IsString()
  @Length(1, 200)
  @IsOptional()
  name?: string;

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
  @IsPhoneNumber()
  @IsOptional()
  fax?: string;

  @IsString()
  @Length(1, 256)
  @IsOptional()
  address?: string;

  @IsUUID()
  @IsOptional()
  insuranceCarrierId: string;
}
