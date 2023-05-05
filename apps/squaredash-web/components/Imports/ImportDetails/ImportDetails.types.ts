import { IItem } from '../../../../../libs/web/components/Select/SelectControlled';
import { FILE_ACTIONS } from './ImportDetails.constants';

export type TImportDetailsData = {
  [x: string]:
    | boolean
    | TImportDetailsCustomer
    | TImportDetailsInsuranceCarrier
    | TImportDetails[]
    | IGroupItem[]
    | IGroup[]
    | string;
};

export type TImportDetailsCustomerData = {
  [x: string]: string;
};

export type TImportDetailsInsuranceCarrierData = {
  [x: string]: string | object;
};

export type TLoadingData = {
  [x: string]: boolean | string;
};

export type TImportDetails = {
  claimNumber: string;
  status: string;
  typeOfLoss: string;
  dateOfLoss: string;
  dateInspected: string;
  policyNumber: string;
  priceList: string;
  itemTotal: number;
  totalTax: number;
  totalRcv: number;
  totalOverhead: number;
  totalLineItems: number;
  depreciation: number;
  totalAcv: number;
  deductible: number;
  netClaimIfDepreciationIsRecovered: number;
  recoverableDepreciation: number;
  nonRecoverabledDepreciation: number;
  totalDepreciation: number;
  fileName: string;
  fileSize: string;
  customer: TImportDetailsCustomer;
  insuranceCarrier: TImportDetailsInsuranceCarrier;
  groups: {
    name: string;
    notes: string;
    items?: IGroupItem[];
    groups?: IGroup[];
    totalTax?: number;
    overhead?: number;
    totalRCV?: number;
    totalACV?: number;
    depreciation?: number;
  }[];
};

export type TImportDetailsCustomer = {
  displayName: string;
  phone: string;
  email: string;
  propertyAddress: string;
  shippingAddress: string;
};

export type TImportDetailsInsuranceCarrier = {
  id: string;
  name: string;
  email: string;
  phone: string;
  fax: string;
  address: string;
  insuranceCarrierId: number;
  createdAt: string;
  updatedAt: string;
  adjusters: IAdjuster[];
};

export type IAdjuster = {
  id: string;
  name: string;
  type: string;
  phone: string;
  email: string;
  address: string;
};

export type IGroup = {
  id: string;
  name: string;
  notes?: string;
  items?: IGroupItem[];
  groups?: IGroup[];
  totalTax?: number;
  overhead?: number;
  totalRCV?: number;
  totalACV?: number;
  depreciation?: number;
};

export type IGroupItem = {
  id: string;
  description: string;
  depreciationPercentage?: number;
  sequence: number;
  notes?: string;
  quantity?: number;
  unitOfMeasurement?: string;
  unitPrice?: number;
  tax?: number;
  overhead?: number;
  rcv?: number;
  acv?: number;
  ageLife?: string;
  condition?: string;
  depreciationSum?: number;
  isDepreciationRefundable?: boolean;
};

export type TDropdownFileItem = {
  title: string;
  actionId?: FILE_ACTIONS;
};

export type TEditedField = {
  title?: string;
  value: string | number | boolean;
  name: string;
  id?: string;
  selectOptions?: IItem[];
};

export type TValidationDataItem = {
  code: string;
  type: string;
  property: string;
  id?: string;
};
