import { IsOptional, IsString, Length } from 'class-validator';

export class ResetPasswordRecieveBody {
  @IsOptional()
  @IsString()
  @Length(8, 128)
  password?: string;
}
