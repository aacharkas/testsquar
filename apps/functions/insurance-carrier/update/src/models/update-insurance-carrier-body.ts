import { Type } from 'class-transformer';
import {
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import 'reflect-metadata';

import { IsValidEmail } from '@squaredash/shared/validators';

import { UpdateUserAddressBody } from './update-user-address-body';

export class UpdateInsuranceCarrierBody {
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

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserAddressBody)
  address?: UpdateUserAddressBody;
}
