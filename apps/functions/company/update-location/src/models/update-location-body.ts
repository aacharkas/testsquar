import { Exclude, Type } from 'class-transformer';
import {
  IsBoolean,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import 'reflect-metadata';

import { IsValidEmail } from '@squaredash/shared/validators';

import { UpdateAddressBody } from './update-address-body';

export class UpdateLocationBody {
  @IsString()
  @Length(1, 100)
  @IsOptional()
  name?: string;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => UpdateAddressBody)
  address?: UpdateAddressBody;

  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  @IsOptional()
  email?: string;

  @IsBoolean()
  @IsOptional()
  isMain?: boolean;

  @ValidateIf((obj) => obj.isUserSuperAdmin)
  @IsString()
  companyId: string;

  @Exclude({ toPlainOnly: true })
  isUserSuperAdmin: boolean;
}
