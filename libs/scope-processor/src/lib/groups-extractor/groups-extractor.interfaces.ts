import { AgeLife, Item, ItemValue } from '@squaredash/shared/models';

import { HeaderType } from './groups-extractor.constants';

export interface ExtractionResult {
  original: string;
  matched?: string | null;
  before?: string | null;
  after?: string | null;
}

export interface HeaderHandler {
  type: HeaderType;
  fields: {
    field: keyof Item;
    defaultValue: () => ItemValue | string | number | AgeLife | null;
  }[];
  extract: (value: string) => ExtractionResult;
  format: (item: Item, value: string) => void;
}
