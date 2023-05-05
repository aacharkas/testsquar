import { Bounds } from './data-element';

export interface GroupRow {
  name: string;
  row: string[];
}

export interface Table {
  spatial: {
    page: number;
    bounds: Bounds;
  }[];
  headers: string[];
  rows: string[][];
  beginsGroups: string[];
  closesGroups: GroupRow[];
}
