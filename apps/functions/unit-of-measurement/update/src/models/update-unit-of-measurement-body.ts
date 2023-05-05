import { IsOptional, IsString, Length } from 'class-validator';

export class UpdateUnitOfMeasurementBody {
  @IsString()
  @IsOptional()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsOptional()
  @Length(1, 5)
  abbreviation: string;
}
