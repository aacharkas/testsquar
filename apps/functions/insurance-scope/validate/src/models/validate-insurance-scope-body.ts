import { IsOptional, IsString } from 'class-validator';

export class ValidateInsuranceScopeBody {
  @IsString()
  insuranceScopeId: string;

  @IsOptional()
  @IsString()
  property?: string;
}
