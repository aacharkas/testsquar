export interface AgeLife {
  age: number | null;
  life: number | null;
  units: string;
}

export interface ItemValue {
  value: string | number;
  units?: string;
  isRefundable?: boolean;
  percentage?: number;
}

export interface Item {
  index: number;
  notes: string[];
  description: string;
  quantity: ItemValue;
  unitPrice: number;
  tax?: number | null;
  overhead?: number | null;
  rcv: number;
  ageLife?: AgeLife | null;
  condition?: string | null;
  depreciation: ItemValue | null;
  acv: number;
}

export interface Totals {
  [key: string]: number;
}

export interface Group {
  name: string;
  notes: string[];
  items: Item[];
  autogenerated?: boolean;
  groups: Group[];
  totals: Totals;
}
