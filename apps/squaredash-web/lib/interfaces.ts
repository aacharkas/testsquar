export interface Company {
  type: 'Company';
  id: number;
  name: string;
}

export interface User {
  type: 'User';
  id: number;
  name: string;
  company: string;
}

export interface Customer {
  type: 'Customer';
  id: number;
  name: string;
}

export interface Estimate {
  type: 'Estimate';
  id: number;
  name: string;
}

export interface Vendor {
  type: 'Vendor';
  id: number;
  name: string;
}

export interface Item {
  type: 'Item';
  id: number;
  name: string;
}

