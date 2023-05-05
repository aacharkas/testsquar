import {
  IsIn,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

import { AdjusterType } from '@squaredash/crud/insurance-carrier-adjuster-draft';
import { IsValidEmail } from '@squaredash/shared/validators';

export class CreateInsuranceCarrierAdjusterBody {
  @IsIn(Object.values(AdjusterType))
  type: AdjusterType;

  @IsString()
  @Length(1, 200)
  name: string;

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
  @IsOptional()
  address?: string;
}
