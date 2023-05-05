import {
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class CreateInsuranceScopeGroupBody {
  @IsString()
  @Length(1, 200)
  name: string;

  @IsString()
  @Length(1, 500)
  @IsOptional()
  notes?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalTax?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalRCV?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalACV?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  depreciation?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  overhead?: number;

  @IsUUID()
  @IsOptional()
  parentId?: string;
}
