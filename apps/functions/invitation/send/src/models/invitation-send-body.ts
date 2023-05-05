import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsTimeZone,
  ValidateNested,
} from 'class-validator';
import 'reflect-metadata';

import { TShirtSize } from '@squaredash/shared/interfaces';

import { SendInvitationAdressBody } from './invitation-send-address-body';
import { InvitationSendBaseBody } from './invitation-send-base-body';

export class SendInvitationBody extends InvitationSendBaseBody {
  @IsString()
  @IsIn(['COMPANY_USER', 'COMPANY_ADMIN', 'COMPANY_OWNER'])
  role: 'COMPANY_USER' | 'COMPANY_ADMIN' | 'COMPANY_OWNER';

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => SendInvitationAdressBody)
  address?: SendInvitationAdressBody;

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
}
