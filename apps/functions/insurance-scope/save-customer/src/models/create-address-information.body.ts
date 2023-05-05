import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

import { CreateAddressBody } from './create-address.body';

export class CreateAddressInformationBody {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsObject()
  @ValidateNested()
  @Type(() => CreateAddressBody)
  address: CreateAddressBody;
}
