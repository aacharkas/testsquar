import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  ValidateNested,
} from 'class-validator';
import 'reflect-metadata';

import { ClaimItemCreateBody } from '../../../../claim-item/create/src/models/claim-item-create-body';

export class CreateInsuranceScopeLineItemBody {
  @IsString()
  @Length(1, 256)
  description: string;

  @IsInt()
  sequence: number;

  @IsString()
  @Length(1, 256)
  @IsOptional()
  notes?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  quantity: number;

  @IsString()
  @Length(1, 5)
  unitOfMeasurement: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  unitPrice: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  tax: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  overhead: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  rcv: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  acv: number;

  @IsString()
  @Length(1, 100)
  @IsOptional()
  ageLife?: string;

  @IsString()
  @Length(1, 5)
  @IsOptional()
  condition?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  depreciationPercentage: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  depreciationSum: number;

  @IsBoolean()
  isDepreciationRefundable: boolean;

  @IsUUID()
  @IsOptional()
  claimItemId?: string;

  @ValidateNested()
  @Type(() => ClaimItemCreateBody)
  @IsOptional()
  claimItem?: ClaimItemCreateBody;
}
