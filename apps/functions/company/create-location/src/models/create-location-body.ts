import { Exclude, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDefined,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import 'reflect-metadata';

import { IsValidEmail } from '@squaredash/shared/validators';

import { CreateAddressBody } from './create-address-body';

export class CreateLocationBody {
  @IsString()
  @Length(1, 100)
  name: string;
  @IsString()
  @IsPhoneNumber()
  phone: string;
  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressBody)
  address: CreateAddressBody;
  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  email: string;
  @IsBoolean()
  @IsOptional()
  isMain?: boolean;

  @ValidateIf((obj) => obj.isUserSuperAdmin)
  @IsString()
  @IsNotEmpty()
  companyId: string;

  @Exclude({ toPlainOnly: true })
  isUserSuperAdmin: boolean;
}
