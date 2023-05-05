import { Claim, Dates, ScopeDetails } from '@squaredash/shared/models';

import { Bounds } from './data-element';
import { KnownTermMatch, TermFormat } from './terms';

export interface ExtractedElement {
  type: 'key' | 'value';
  bounds: Bounds;
  value: string;
}

export class ExtractedKey implements ExtractedElement {
  type = 'key' as const;
  term?: KnownTermMatch;
  bounds!: Bounds;
  value!: string;

  constructor(partial: Partial<ExtractedKey>) {
    Object.assign(this, partial);
  }
}

export class ExtractedValue implements ExtractedElement {
  type = 'value' as const;
  bounds!: Bounds;
  key?: string;
  format?: TermFormat;
  property?: keyof Dates | keyof Claim;
  group?: keyof ScopeDetails;
  value!: string;

  constructor(partial: Partial<ExtractedValue>) {
    Object.assign(this, partial);
  }
}
