import { SORT_ORDER } from '../sort-order';
import { SORTABLE_USER_COLUMNS } from './sortable-user-columns';
import { USER_ROLE } from './user-role';
import { USER_STATUS } from './user-status';

// TODO: rewrite it to type
export interface UserSearchOptions {
  search?: string;
  sortOrder: SORT_ORDER;
  sortCol: SORTABLE_USER_COLUMNS;
  roles?: USER_ROLE[];
  statuses?: USER_STATUS[];
  take: number;
  skip: number;
  companyId: string;
}
