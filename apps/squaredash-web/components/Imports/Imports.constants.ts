export const ITEMS_PER_PAGE = 25;
export const CIRCUMFERENCE = ((2 * 22) / 7) * 25;

export const CUSTOMERS = [
  { id: 0, name: 'All customers' },
  { id: 1, name: 'Customer 1' },
  { id: 2, name: 'Customer 2' },
];

export const ALL_CUSTOMERS = 'all_customers';
export const ALL_INSURANCE_CARRIERS = 'all_insurance_carriers';

export const INSURANCE_CARRIERS = [
  { id: 0, name: 'All Insurance Carriers' },
  { id: 1, name: 'Carrier 1' },
  { id: 2, name: 'Carrier 2' },
];

export const DEFAULT_IMPORTS_FILTERS = {
  search: '',
  skip: 0,
  customers: [CUSTOMERS[0]],
  insuranceCarriers: [INSURANCE_CARRIERS[0]],
  RCV: {
    valueFrom: '',
    valueTo: '',
  },
  dates: {
    dateFrom: null,
    dateTo: null,
  },
};

export const IMPORTS_API = 'insurance-scope';

export const MIN_DATE_FROM = '2019-12-31';
export const SUPPORTED_TYPES = ['.pdf'];

export const SEARCH_SIMBOLS = 2;
export const NUMBER_REQUEST_ELEMENTS = 5;
export const NUMBER_SHOW_TO_USER = 5;
