import { IsIn, IsString, MaxLength } from 'class-validator';

export class ClaimItemCreateBody {
  @IsString()
  @MaxLength(225)
  description: string;

  @IsString()
  @IsIn(['XACTIMATE', 'SYMBILITY', 'OTHER'])
  source: 'XACTIMATE' | 'SYMBILITY' | 'OTHER';
}
