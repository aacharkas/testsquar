import { Item } from '@squaredash/shared/models';

export const headerTypes = [
  'description',
  'quantity',
  'unitPrice',
  'ageLife',
  'condition',
  'depreciation',
  'depPercent',
  'tax',
  'acv',
  'rcv',
  'overhead',
] as const;

export type HeaderType = (typeof headerTypes)[number];

export const headersToTypes: { [key: string]: HeaderType[] } = {
  DESCRIPTION: ['description'],
  QUANTITY: ['quantity'],
  'AGE/LIFE CONDITION': ['ageLife', 'condition'],
  'AGE/LIFE COND.': ['ageLife', 'condition'],
  'AGE/LIFE': ['ageLife'],
  'COND.': ['condition'],
  CONDITION: ['condition'],
  'DEPREC. DEP %': ['depreciation', 'depPercent'],
  'DEPREC.': ['depreciation'],
  DEPRECIATION: ['depreciation'],
  'DEP %': ['depPercent'],
  'UNIT PRICE': ['unitPrice'],
  UNIT: ['unitPrice'],
  TAX: ['tax'],
  RCV: ['rcv'],
  ACV: ['acv'],
  'O&P': ['overhead'],
};

export const typesToItemHeaders: { [key in HeaderType]: keyof Item } = {
  description: 'description',
  quantity: 'quantity',
  unitPrice: 'unitPrice',
  ageLife: 'ageLife',
  condition: 'condition',
  depreciation: 'depreciation',
  depPercent: 'depreciation',
  tax: 'tax',
  acv: 'acv',
  rcv: 'rcv',
  overhead: 'overhead',
};
