import { JobStatus } from '@prisma/client';

export interface JobListParams {
  responsibleUserId?: string;
  search?: string;
  take: number;
  skip: number;
  filter: {
    companyIds?: string[];
    customerIds?: string[];
    insuranceCarrierIds?: string[];
    statuses?: JobStatus[];
    dateOfLossFrom?: string;
    dateOfLossTo?: string;
    createdFrom?: string;
    createdTo?: string;
    loanFrom?: number;
    loanTo?: number;
    dueBalanceFrom?: number;
    dueBalanceTo?: number;
  };
}
