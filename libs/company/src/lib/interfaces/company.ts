import { List } from '@squaredash/shared/interfaces';

export interface Company {
  id: string;
  name: string;
  owners: List<{
    id: string;
    name: string;
  }>;
}
