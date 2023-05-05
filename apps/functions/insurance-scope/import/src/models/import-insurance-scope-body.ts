import { IsString } from 'class-validator';

export class ImportInsuranceScopeBody {
  @IsString()
  objectId: string;
  @IsString()
  initialDocumentName: string;
}
