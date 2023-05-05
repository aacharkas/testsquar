import { Exclude, Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDefined,
  IsIn,
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

import { CustomerType } from '@squaredash/customer';
import { AddressBody } from '@squaredash/shared/models';
import { IsValidEmail } from '@squaredash/shared/validators';

export class UpdateCustomerBody {
  @IsOptional()
  @IsIn(['INDIVIDUAL', 'BUSINESS'])
  type: CustomerType | null;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  firstName: string | null;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  lastName: string | null;

  @IsString()
  @Length(1, 200)
  @IsOptional()
  displayName: string | null;

  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  @IsOptional()
  email: string | null;

  @IsString()
  @IsPhoneNumber()
  @IsOptional()
  phone: string | null;

  @IsString()
  @IsOptional()
  billingName: string | null;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressBody)
  @IsOptional()
  billingAddress: AddressBody | null;

  @IsString()
  @IsOptional()
  shippingName: string | null;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressBody)
  @IsOptional()
  shippingAddress: AddressBody | null;

  @IsString()
  @IsOptional()
  parentId: string | null;

  @ValidateIf((obj) => !obj.isCompanyUser)
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  @IsOptional()
  responsibleMemberIds: string[] | null;

  @ValidateIf((obj) => obj.isUserSuperAdmin)
  @IsString()
  companyId: string;

  @IsString()
  @Length(0, 4000)
  @IsOptional()
  notes: string | null;

  @Exclude({ toPlainOnly: true })
  isCompanyUser: boolean;

  @Exclude({ toPlainOnly: true })
  isUserSuperAdmin: boolean;
}
