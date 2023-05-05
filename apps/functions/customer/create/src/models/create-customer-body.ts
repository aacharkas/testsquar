import { Exclude, Transform, Type } from 'class-transformer';
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

export class CreateCustomerBody {
  @IsOptional()
  @IsIn(['INDIVIDUAL', 'BUSINESS'])
  type: CustomerType | null;

  @IsString()
  @Length(1, 100)
  firstName: string;

  @IsString()
  @Length(1, 100)
  lastName: string;

  @IsString()
  @Length(1, 200)
  @IsOptional()
  @Transform(({ value, obj }) => value || `${obj.firstName} ${obj.lastName}`)
  displayName: string;

  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  email: string;

  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsString()
  @IsOptional()
  @Transform(({ value, obj }) => value || obj.displayName)
  billingName: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressBody)
  billingAddress: AddressBody;

  @IsString()
  @IsOptional()
  @Transform(({ value, obj }) => value || obj.displayName)
  shippingName: string;

  @IsDefined()
  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => AddressBody)
  shippingAddress: AddressBody;

  @IsString()
  @IsOptional()
  parentId: string | null;

  @ValidateIf((obj) => !obj.isCompanyUser)
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(5)
  responsibleMemberIds: string[];

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
