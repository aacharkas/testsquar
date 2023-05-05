import { IsValidEmail } from '@squaredash/shared/validators';

export class ResetPasswordSendBody {
  @IsValidEmail()
  email: string;
}
