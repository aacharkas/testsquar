import { IsNotEmpty, IsString } from 'class-validator';

import { IsValidEmail } from '@squaredash/shared/validators';

export class UserChangeEmailBody {
  @IsNotEmpty()
  @IsString()
  @IsValidEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  userId: string;
}
