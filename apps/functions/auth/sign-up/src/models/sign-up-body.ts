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

import { TShirtSize } from '@squaredash/shared/interfaces';
import { IsValidEmail } from '@squaredash/shared/validators';

import { SignUpAddressBody } from './sign-up-address-body';

export class SignUpBody {
  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  email: string;

  @IsString()
  @Length(8, 128)
  password: string;

  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SignUpAddressBody)
  address?: SignUpAddressBody;

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
  @IsString()
  invitationToken?: string;
}
