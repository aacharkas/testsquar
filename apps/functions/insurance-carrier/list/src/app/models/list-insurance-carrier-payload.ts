import { SORT_ORDER } from '@squaredash/shared/constants';

import { SORTABLE_INSURANCE_CARRIER_COLUMNS } from '../constants/sortable-insurance-carrier-columns';

export interface ListInsuranceCarrierPayload {
  search?: string;
  take: number;
  skip: number;
  sortOrder: SORT_ORDER;
  sortCol: SORTABLE_INSURANCE_CARRIER_COLUMNS;
}
