// import { DocumentData, DocumentReference } from '@google-cloud/firestore';

export interface Claim {
  createdById: string;
  createdBy: any;
  belongsToId: string;
  claimNumber: string;
  projectId: string;
}
