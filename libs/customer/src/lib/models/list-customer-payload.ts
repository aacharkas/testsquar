import {
  CUSTOMER_CATEGORY,
  SORTABLE_CUSTOMER_COLUMNS,
  SORT_ORDER,
} from '@squaredash/shared/constants';

export type ListCustomerPayload = {
  search?: string;
  take: number;
  skip: number;
  sortOrder: SORT_ORDER;
  sortCol: SORTABLE_CUSTOMER_COLUMNS;
  type?: 'INDIVIDUAL' | 'BUSINESS';
  category?: CUSTOMER_CATEGORY;
  parents?: string[];
  responsibleMembers?: string[];
  companyId: string;
  userId?: string;
};
