import { ClaimInfo, Dates, ScopeDetails } from '@squaredash/shared/models';

export type TermFormat =
  | 'email'
  | 'phone'
  | 'address'
  | 'text'
  | 'street'
  | 'postal'
  | 'partial-phone';

export interface KnownTerm {
  term: string;
  formats?: TermFormat[];
  property?: keyof Dates | keyof ClaimInfo;
  group?: keyof ScopeDetails;
}

export interface KnownTermMatch extends KnownTerm {
  index: number;
  value: string;
}

export interface FormatMatch {
  format: TermFormat;
  value: string;
}

export interface PartialFormatMatch {
  format?: TermFormat;
  value: string;
}
