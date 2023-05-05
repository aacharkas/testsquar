import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsObject,
  IsPhoneNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CustomerType } from '@squaredash/customer';
import { IsValidEmail } from '@squaredash/shared/validators';

import { CreateAddressInformationBody } from './create-address-information.body';

export class SaveCustomerDetailsBody {
  @IsNotEmpty()
  @IsIn(['INDIVIDUAL', 'BUSINESS'])
  type: CustomerType;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsNotEmpty()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  phoneNumber: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressInformationBody)
  billingInformation: CreateAddressInformationBody;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressInformationBody)
  shippingInformation: CreateAddressInformationBody;
}
