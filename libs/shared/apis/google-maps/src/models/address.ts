import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class Address {
  @IsNotEmpty()
  @IsString()
  placeId!: string;

  @IsNotEmpty()
  @IsString()
  country!: string;

  @IsNotEmpty()
  @IsString()
  state!: string;

  @IsNotEmpty()
  @IsString()
  city!: string;

  @IsNotEmpty()
  @IsString()
  zipCode!: string;

  @IsNotEmpty()
  @IsString()
  streetAddress1!: string;

  @IsOptional()
  @IsString()
  streetAddress2!: string | null;

  @IsOptional()
  @IsString()
  apartment!: string | null;

  @IsNotEmpty()
  @IsString()
  formattedAddress!: string;

  @IsNotEmpty()
  @IsNumber()
  latitude!: number;

  @IsNotEmpty()
  @IsNumber()
  longitude!: number;
}
