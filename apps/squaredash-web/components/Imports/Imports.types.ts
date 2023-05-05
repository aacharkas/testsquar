export type TSelectElement = {
  id: number;
  name: string;
};

export type TFilters = {
  search: string;
  skip: number;
  insuranceCarriers?: TSelectElement[];
  customers?: TSelectElement[];
  RCV?: {
    valueFrom: string | number;
    valueTo: string | number;
  };
  dates?: {
    dateFrom: Date | string | null;
    dateTo: Date | string | null;
  };
};

export type TImport = {
  id: string;
  dateOfLoss: string;
  claimNumber: string;
  customerName: string;
  propertyAddress: string;
  insuranceCarrierName: string;
  rcv: number;
  deductible: number;
  status: string;
};

export type TDropdownItem = {
  href: string;
  title: string;
  id?: string;
};

export type TAction = {
  action: string;
  label: string;
};
