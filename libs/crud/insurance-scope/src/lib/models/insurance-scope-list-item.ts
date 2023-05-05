import { InsuranceScopeStatus } from '@prisma/client';

export type InsuranceScopeListItem = {
  id: string;
  createdAt: Date;
  companyName: string;
  dateOfLoss: Date;
  claimNumber: string;
  customerName: string;
  propertyAddress: string;
  insuranceCarrierName: string;
  rcv: number;
  deductible: number;
  status: InsuranceScopeStatus;
  versionId: string;
};
