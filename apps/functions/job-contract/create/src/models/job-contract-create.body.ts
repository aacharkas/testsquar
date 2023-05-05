import { IsNotEmpty, IsString } from 'class-validator';

export class JobContractCreateBody {
  @IsNotEmpty()
  @IsString()
  initialDocumentName: string;

  @IsNotEmpty()
  @IsString()
  fileId: string;
}
