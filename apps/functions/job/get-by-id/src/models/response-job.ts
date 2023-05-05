import { JobStatus } from '@prisma/client';

export interface ResponseJob {
  id: string;
  claimNumber: string;
  typeOfLoss: string | null;
  dateOfLoss: Date | null;
  policyNumber: string | null;
  priceList: string | null;
  status: JobStatus;
  totalLineItems: number;
  totalTax: number;
  totalRcv: number;
  totalAcv: number;
  totalOverhead: number;
  totalDepreciation: number;
  deductible: number;
  netClaimSum: number;
  totalRecoverableDepreciationSum: number;
  totalNonRecoverableDepreciationSum: number;
  netClaimIfDepreciationIsRecovered: number;
  groups: ResponseGroup[];
  customer: ResponseCustomer;
  insuranceCarrier: ResponseInsuranceCarrier;
  companyId: string;
  insuranceScopeId: string;
}

export interface ResponseGroup {
  id: string;
  name: string;
  notes: string | null;
  totalTax: number;
  totalRCV: number;
  totalACV: number;
  depreciation: number;
  overhead: number;
  groups: ResponseGroup[];
  items: ResponseLineItem[];
}

export interface ResponseLineItem {
  id: string;
  description: string;
  sequence: number;
  notes: string | null;
  quantity: number;
  unitOfMeasurement: string;
  unitPrice: number;
  tax: number;
  overhead: number;
  rcv: number;
  acv: number;
  depreciationPercentage: number;
  depreciationSum: number;
  isDepreciationRefundable: boolean;
  includedInJob: boolean;
}

export interface ResponseInsuranceCarrier {
  id: string;
  email: string | null;
  phone: string | null;
  adjusters: ResponseAdjuster[];
  displayName: string;
}

export interface ResponseAdjuster {
  id: string;
  name: string;
  type: string;
  phone: string | null;
  email: string | null;
}

export interface ResponseCustomer {
  id: string;
  propertyAddress: string;
  displayName: string;
  firstName: string;
  lastName: string;
  phone: string;
  shippingAddress: string;
  email: string;
}
