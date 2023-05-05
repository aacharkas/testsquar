import {
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateInsuranceScopeBody {
  @IsString()
  @Length(1, 20)
  @IsOptional()
  claimNumber?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  typeOfLoss?: string;

  @IsDateString()
  @IsOptional()
  dateOfLoss?: string;

  @IsDateString()
  @IsOptional()
  dateInspected?: string;

  @IsDateString()
  @IsOptional()
  dateContacted?: string;

  @IsDateString()
  @IsOptional()
  dateReceived?: string;

  @IsDateString()
  @IsOptional()
  dateEntered?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  policyNumber?: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  priceList?: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalLineItems?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalTax?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalRcv?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalAcv?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalOverhead?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalDepreciation?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  deductible?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  netClaimSum?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalRecoverableDepreciationSum?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  totalNonRecoverableDepreciationSum?: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsOptional()
  netClaimIfDepreciationIsRecovered?: number;
}
