import { SORT_ORDER } from '@squaredash/shared/constants';
import { SORTABLE_COMPANY_COLUMNS } from '@squaredash/shared/constants';

export interface CompanySearchOptions {
  search?: string;
  sortOrder: SORT_ORDER;
  sortCol: SORTABLE_COMPANY_COLUMNS;
  take: number;
  skip: number;
}
