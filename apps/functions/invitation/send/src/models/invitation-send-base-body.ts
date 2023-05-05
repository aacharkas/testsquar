import { IsString, Length } from 'class-validator';

import { IsValidEmail } from '@squaredash/shared/validators';

export class InvitationSendBaseBody {
  @IsString()
  @Length(1, 50)
  name: string;

  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  email: string;

  @IsString()
  role: string;
}
