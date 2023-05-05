import { IsStrongPassword, Length } from 'class-validator';

export class ChangePasswordBody {
  @Length(8, 128)
  oldPassword: string;
  @Length(8, 128)
  newPassword: string;
}
