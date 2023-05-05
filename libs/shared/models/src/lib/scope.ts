// import { DocumentData, DocumentReference } from '@google-cloud/firestore';
import { Entity } from './entity';
import { Group } from './group';
import { Summary } from './summary';

export interface Roof {
  sqCount: {
    remove: number | string | bigint;
    replace: number | string | bigint;
    unit: string;
  };
  steep: string;
  high: string;
  ridgeCap?: { type: string; size: number | string };
  roofType: string;
}

export type ScopeStatus = 'review' | 'success' | 'deleted';

export interface Scope {
  originalFile: any;
  originalFileId: string;
  createdBy: any;
  createdById: string;
  belongsTo: any;
  belongsToId: string;
  createdAt: string;

  /* Querying data */
  claimId: string;
  projectId: string;

  /* Inferred data */
  primaryCustomer?: Entity;
  customers: Entity[];
  adjusters: Entity[];
  companyName?: string;
  insuranceCompany_name?: string;
  insuranceCompany_logo?: string;
  streetAddress?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  lat?: number;
  lng?: number;
  dateOfLoss?: string;
  neighborhood?: string;
  rcv?: number;
  acv?: number;
  depreciation?: number;
  roof?: Roof;
  satImageUrl?: string;
  pillStatusStyles: PillStatusStyles;
  documentId?: string;
  index: number;
  fileName: string;
  claimNumber: string;
  status: ScopeStatus;
  storagePath: string;
  headers: string[];
  groups: Group[];
  summaries?: Summary[];

  /* Version control */
  original?: Scope;
}

export interface PillStatusStyles {
  success: string;
  review: string;
  processing: string;
  failed: string;
  error: string;
  deleted: string;
}
