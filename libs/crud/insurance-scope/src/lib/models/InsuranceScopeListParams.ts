import { InsuranceScopeStatus } from '@prisma/client';

export interface InsuranceScopeListParams {
  responsibleUserId?: string;
  search?: string;
  take: number;
  skip: number;
  filter: {
    customerIds?: string[];
    insuranceCarrierIds?: string[];
    dateOfLossFrom?: string;
    dateOfLossTo?: string;
    rcvFrom?: number;
    rcvTo?: number;
    companyIds?: string[];
    createdAtFrom?: string;
    createdAtTo?: string;
    status?: InsuranceScopeStatus[];
  };
}
