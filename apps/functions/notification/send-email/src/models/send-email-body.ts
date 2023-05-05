import { IsEnum, IsOptional } from 'class-validator';

import { TemplateIds } from '@squaredash/shared/util';
import { IsValidEmail } from '@squaredash/shared/validators';

export class SendEmailBody {
  @IsValidEmail()
  recipient: string;

  @IsEnum(TemplateIds)
  templateId: TemplateIds;

  @IsOptional()
  data: { [key: string]: string };
}
