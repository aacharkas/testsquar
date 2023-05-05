// import { DocumentData, DocumentReference } from 'firebase/firestore';
export enum ScopeItemCategory {
  roofing = 'roofing',
}

export enum ScopeItemKeyWords {
  tileRoofing = 'Tile roofing',
  tile = 'Tile',
  clay = 'Clay',
}

export interface ScopeItemCatalog {
  name: string; // shingles, shakes, tiles.... etc
}

export interface ScopeItem {
  unitCost: number;
  unit: string;
  // selector: ScopeItemSelector;
  description: string;
  // role: ScopeItemRole;
  // use: ScopeItemUse;
  // type: ScopeItemType;
  // subType: ScopeItemSubType;
  size: string;
  category: ScopeItemCategory;
  catalog: Array<ScopeItemCatalog>;
  // modifier: ScopeItemModifier;
  // detail?: ScopeItemDetail;
  act?: string;
  // action: ScopeItemAction;
  life: number;
  modifiers: string;
  keyWords: Array<ScopeItemKeyWords>;
  tags: Array<string>;
  createdById: string;
  createdBy: any;
}

export interface SquaredashItem {
  name: string;
  items: Array<ScopeItem>;
  searchTerms: Array<string>;
  createdById: string;
  createdBy: any;
}
