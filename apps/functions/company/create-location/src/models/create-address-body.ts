import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAddressBody {
  @IsString()
  country: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsString()
  zipCode: string;
  @IsString()
  streetAddress1: string;
  @IsOptional()
  @IsString()
  streetAddress2: string | null;
  @IsOptional()
  @IsString()
  apartment: string | null;
  @IsNumber()
  latitude: number;
  @IsNumber()
  longitude: number;
  @IsString()
  placeId: string;
  @IsString()
  formattedAddress: string;
}
