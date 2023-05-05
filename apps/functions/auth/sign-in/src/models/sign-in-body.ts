import { IsString, Length } from 'class-validator';

import { IsValidEmail } from '@squaredash/shared/validators';

export class SignInBody {
  @IsString()
  @IsValidEmail()
  @Length(5, 254)
  email: string;

  @IsString()
  @Length(8, 128)
  password: string;
}
