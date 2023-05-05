import {
  IsBoolean,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateInsuranceScopeLineItemBody {
  @IsString()
  @Length(1, 256)
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  sequence?: number;

  @IsString()
  @Length(1, 256)
  @IsOptional()
  notes?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  quantity?: number;

  @IsString()
  @Length(1, 5)
  @IsOptional()
  unitOfMeasurement?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  unitPrice?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  tax?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  overhead?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  rcv?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  acv?: number;

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
  depreciationPercentage?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  depreciationSum?: number;

  @IsBoolean()
  @IsOptional()
  isDepreciationRefundable?: boolean;
}
