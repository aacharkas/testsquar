import { List } from '@squaredash/shared/interfaces';

import { CompanyLocation } from '../interfaces';

export interface CompanyWithMetaOwnerResponse {
  id: string;
  name: string;
  legalName: string;
  locations: CompanyLocation[];
  owners: List<{
    id: string;
    name: string;
  }>;
  avatar: string;
}
