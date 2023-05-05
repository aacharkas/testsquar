import { InsuranceScopeStatus, Job } from '@prisma/client';

import { Nullable } from '@squaredash/shared/interfaces';

import { CustomerViewQueryResult } from './insurance-scope-with-meta-query-result';

export interface InsuranceScopeGroupInfo {
  id: string;
  name: string;
  notes: Nullable<string>;
  totalTax: Nullable<number>;
  totalRCV: Nullable<number>;
  totalACV: Nullable<number>;
  depreciation: Nullable<number>;
  overhead: Nullable<number>;
  createdAt: Date;
  updatedAt: Date;
  groups: InsuranceScopeGroupInfo[];
  items: InsuranceScopeLineItemInfo[];
}

export interface CustomerInfo {
  id: string;
  customerId: string | null;
  displayName: Nullable<string>;
  type: Nullable<string>;
  firstName: Nullable<string>;
  lastName: Nullable<string>;
  email: Nullable<string>;
  phone: Nullable<string>;
  propertyAddress: Nullable<string>;
  shippingAddress: Nullable<string>;
  createdAt: Date;
  updatedAt: Date;
  responsibleUserIds: string[];
  savedCustomer: CustomerViewQueryResult['customer'];
}

export interface InsuranceCarrierInfo {
  id: string;
  name: Nullable<string>;
  email: Nullable<string>;
  phone: Nullable<string>;
  fax: Nullable<string>;
  address: Nullable<string>;
  insuranceCarrierId: Nullable<string>;
  adjusters: InsuranceCarrierAdjusterInfo[];
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceCarrierAdjusterInfo {
  id: string;
  name: Nullable<string>;
  type: Nullable<string>;
  phone: Nullable<string>;
  email: Nullable<string>;
  address: Nullable<string>;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceScopeLineItemInfo {
  id: string;
  description: string;
  sequence: number;
  notes: Nullable<string>;
  quantity: Nullable<number>;
  unitOfMeasurement: Nullable<string>;
  unitPrice: Nullable<number>;
  tax: Nullable<number>;
  overhead: Nullable<number>;
  rcv: Nullable<number>;
  acv: Nullable<number>;
  ageLife: Nullable<string>;
  condition: Nullable<string>;
  depreciationPercentage: Nullable<number>;
  depreciationSum: Nullable<number>;
  isDepreciationRefundable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface InsuranceScopeWithMeta {
  id: string;
  claimNumber: Nullable<string>;
  typeOfLoss: Nullable<string>;
  dateOfLoss: Nullable<Date>;
  dateInspected: Nullable<Date>;
  dateContacted: Nullable<Date>;
  dateReceived: Nullable<Date>;
  dateEntered: Nullable<Date>;
  policyNumber: Nullable<string>;
  priceList: Nullable<string>;
  status: InsuranceScopeStatus;
  initialDocumentId: string;
  initialDocumentName: string;
  totalLineItems: Nullable<number>;
  totalTax: Nullable<number>;
  totalRcv: Nullable<number>;
  totalAcv: Nullable<number>;
  totalOverhead: Nullable<number>;
  totalDepreciation: Nullable<number>;
  deductible: Nullable<number>;
  netClaimSum: Nullable<number>;
  totalRecoverableDepreciationSum: Nullable<number>;
  totalNonRecoverableDepreciationSum: Nullable<number>;
  netClaimIfDepreciationIsRecovered: Nullable<number>;
  createdAt: Date;
  updatedAt: Date;
  groups: InsuranceScopeGroupInfo[];
  customer: CustomerInfo;
  insuranceCarrier: InsuranceCarrierInfo;
  companyId: string;
  job: Job | null;
}
