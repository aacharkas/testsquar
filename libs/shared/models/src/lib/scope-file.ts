// import { DocumentData, DocumentReference } from '@google-cloud/firestore';
import { Geocode } from './geocode';
import { Group, Item, Totals } from './group';
import { Summary } from './summary';

export interface Name {
  firstName: string;
  lastName: string;
}

export interface RawValue {
  type: string;
  value: string;
}

export interface Record {
  type: string;
  name: string;
  phones: RawValue[];
  emails: RawValue[];
  addresses: RawValue[];
}

export interface Company {
  name?: string;
  type?: string;
  phones?: RawValue[];
  emails?: RawValue[];
  addresses?: RawValue[];
  representatives?: Representative[];
}

export interface Representative {
  name?: string;
  title?: string;
  role?: string;
  phones?: RawValue[];
  emails?: RawValue[];
  addresses?: RawValue[];
}

export interface Dates {
  dateOfLoss?: string;
  dateInspected?: string;
  dateEstCompleted?: string;
  dateEntered?: string;
  dateContacted?: string;
  dateReceived?: string;
}

export interface ClaimInfo {
  claimNumber?: string;
  typeOfLoss?: string;
  policyNumber?: string;
  estimateName?: string;
  priceList?: string;
}

export interface ScopeDetails {
  customers: Record[];
  adjusters: Record[];
  companies: Record[];
  dates: Dates;
  claim: ClaimInfo;
}

export interface ScopeContent extends ScopeDetails {
  headers: (keyof Item)[];
  groups: Group[];
  summaries: Summary[];
  totals: Totals;
}

export type ScopeFileStatus = 'uploaded' | 'processing' | 'failed' | 'success';

export interface ScopeFile {
  uploadedBy: any;
  storagePath: string;
  fileName: string;
  status: ScopeFileStatus;
  content?: ScopeContent;
  geocode?: Geocode;
}
