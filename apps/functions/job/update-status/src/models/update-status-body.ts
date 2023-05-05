import { JobStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateStatusBody {
  @IsEnum([JobStatus.COMPLETED])
  status: JobStatus;
}
