import { IsNumber, IsOptional, IsString, Length } from 'class-validator';

export class UpdateInsuranceScopeGroupBody {
  @IsString()
  @Length(1, 200)
  @IsOptional()
  name?: string;

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
}
