import { JobStatus } from '@prisma/client';

export interface JobListQueryResult {
  id: string;
  customerName: string;
  propertyAddress: string;
  insuranceCarrierName: string;
  claimNumber: string;
  dateOfLoss: Date;
  dueBalance: number;
  loanBalance: number;
  sumPaid: number;
  deductible: number;
  availableAdvance: number;
  status: JobStatus;
  createdAt: Date;
}
