import { IsOptional, IsString, Length } from 'class-validator';

export class UpsertEmailTemplateBody {
  @IsString()
  templateId: string;

  @IsString()
  @IsOptional()
  @Length(1, 256)
  customSubject: string;

  @IsString()
  @IsOptional()
  @Length(1)
  customBody: string;

  @IsString()
  @IsOptional()
  customButtonText: string;
}
