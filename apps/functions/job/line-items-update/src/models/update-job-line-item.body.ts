import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class UpdateJobLineItemBody {
  @IsNotEmpty()
  @IsString()
  id: string;

  @IsNotEmpty()
  @IsBoolean()
  includedInJob: boolean;
}
