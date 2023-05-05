import { IsNotEmpty, IsString } from 'class-validator';

export class SubmitChangedEmailBody {
  @IsNotEmpty()
  @IsString()
  token: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
