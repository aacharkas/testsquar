import { IsIn, IsString } from 'class-validator';

export class ClaimItemUpdateBody {
  @IsString()
  description: string;

  @IsString()
  @IsIn(['XACTIMATE', 'SYMBILITY', 'OTHER'])
  source: 'XACTIMATE' | 'SYMBILITY' | 'OTHER';
}
