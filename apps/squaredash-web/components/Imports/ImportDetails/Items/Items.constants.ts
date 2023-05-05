export enum GROUP_ACTIONS {
  ADD_GROUP,
  ADD_ITEM,
  DELETE_GROUP,
}

export const GROUP_FIELDS = {
  GROUP_NAME: 'name',
  GROUP_NOTES: 'notes',
  GROUP_TOTAL_TAX: 'totalTax',
  GROUP_TOTAL_RCV: 'totalRCV',
  GROUP_TOTAL_ACV: 'totalACV',
  GROUP_TOTAL_DEPRECIATION: 'depreciation',
  GROUP_TOTAL_OVERHEAD: 'overhead',
  GROUP_PARENT_ID: 'parentId',
};

export const DEFAULT_GROUP = {
  [GROUP_FIELDS.GROUP_NAME]: '',
  [GROUP_FIELDS.GROUP_NOTES]: null,
  [GROUP_FIELDS.GROUP_TOTAL_TAX]: null,
  [GROUP_FIELDS.GROUP_TOTAL_RCV]: null,
  [GROUP_FIELDS.GROUP_TOTAL_ACV]: null,
  [GROUP_FIELDS.GROUP_TOTAL_DEPRECIATION]: null,
  [GROUP_FIELDS.GROUP_TOTAL_OVERHEAD]: null,
  [GROUP_FIELDS.GROUP_PARENT_ID]: null,
};

export const GROUP_ITEM_FIELDS = {
  GROUP_ITEM_DESCRIPTION: 'description',
  GROUP_ITEM_NOTES: 'notes',
  GROUP_ITEM_SEQUENCE: 'sequence',
  GROUP_ITEM_QUANTITY: 'quantity',
  GROUP_ITEM_UNIT_OF_MEASUREMENT: 'unitOfMeasurement',
  GROUP_ITEM_UNIT_PRICE: 'unitPrice',
  GROUP_ITEM_TAX: 'tax',
  GROUP_ITEM_RCV: 'rcv',
  GROUP_ITEM_ACV: 'acv',
  GROUP_ITEM_OVERHEAD: 'overhead',
  GROUP_ITEM_DEPRECIATION_SUM: 'depreciationSum',
  GROUP_ITEM_DEPRECIATION_PERCENTAGE: 'depreciationPercentage',
  GROUP_ITEM_AGE_LIFE: 'ageLife',
  GROUP_ITEM_CONDITION: 'condition',
  GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE: 'isDepreciationRefundable',
  GROUP_ITEM_SOURCE: 'source',
  GROUP_ITEM_ID: 'claimItemId',
  GROUP_ITEM_NEW: 'claimItem',
};

export const DEPRECIATION_RECOVERABLE_OPTIONS = [
  { id: 1, name: 'No', type: false },
  { id: 2, name: 'Yes', type: true },
];

export const DEFAULT_GROUP_ITEM = {
  [GROUP_ITEM_FIELDS.GROUP_ITEM_DESCRIPTION]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_NOTES]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_SEQUENCE]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_QUANTITY]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_OF_MEASUREMENT]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_UNIT_PRICE]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_TAX]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_RCV]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_ACV]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_OVERHEAD]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_SUM]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_DEPRECIATION_PERCENTAGE]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_AGE_LIFE]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_CONDITION]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_IS_DEPRECIATION_REFUNDABLE]:
    DEPRECIATION_RECOVERABLE_OPTIONS[0],
  [GROUP_ITEM_FIELDS.GROUP_ITEM_AGE_LIFE]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_CONDITION]: null,
  [GROUP_ITEM_FIELDS.GROUP_ITEM_SOURCE]: null,
};

export const UNITS = [
  { id: 1, name: 'SQ', type: 'SQ' },
  { id: 2, name: 'LF', type: 'LF' },
];

export const VALUES_TO_EXCLUDE = ['e', 'E', '+', '-'];

// API
export const UOM_API = 'unit-of-measurement';