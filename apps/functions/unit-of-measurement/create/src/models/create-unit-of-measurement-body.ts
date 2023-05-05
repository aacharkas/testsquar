import { IsString, Length } from 'class-validator';
import 'reflect-metadata';

export class CreateUnitOfMeasurementBody {
  @IsString()
  @Length(1, 100)
  name: string;

  @IsString()
  @Length(1, 5)
  abbreviation: string;
}
