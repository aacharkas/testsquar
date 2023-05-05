import { COMPANY_STATUS } from '@squaredash/shared/constants';
import { List } from '@squaredash/shared/interfaces';

export interface CompanyListRow {
  id: string;
  name: string;
  status: COMPANY_STATUS;
  owners: List<{
    id: string;
    name: string;
  }>;
  avatar?: string | null;
}
