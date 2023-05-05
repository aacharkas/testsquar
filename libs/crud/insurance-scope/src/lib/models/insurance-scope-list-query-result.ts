import { InsuranceScopeStatus } from '@prisma/client';

export interface InsuranceScopeListQueryResult {
  id: string;
  createdAt: Date;
  companyName: string;
  dateOfLoss: Date;
  claimNumber: string;
  customerName: string;
  propertyAddress: string;
  insuranceCarrierName: string;
  totalRcv: number;
  deductible: number;
  status: InsuranceScopeStatus;
  versionId: string;
  savedCustomerName: string | null;
}
