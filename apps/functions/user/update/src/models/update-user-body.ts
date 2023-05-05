import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsTimeZone,
  Length,
  ValidateNested,
} from 'class-validator';
import 'reflect-metadata';

import { USER_ROLE } from '@squaredash/shared/constants';
import { TShirtSize } from '@squaredash/shared/interfaces';

import { UpdateUserAddressBody } from './update-user-address-body';

export class UpdateUserBody {
  @IsString()
  @Length(1, 50)
  @IsOptional()
  name?: string;
  @IsString()
  @IsOptional()
  role?: USER_ROLE;
  @IsString()
  @IsOptional()
  avatarId?: string;
  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;
  @IsDateString()
  @IsOptional()
  birthDate?: string;
  @IsString()
  @IsIn(['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'])
  @IsOptional()
  tShirtSize?: TShirtSize;
  @IsString()
  @IsTimeZone()
  @IsOptional()
  timezone?: string;
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => UpdateUserAddressBody)
  address?: UpdateUserAddressBody | null;
}
