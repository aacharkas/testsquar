import {
  SORTABLE_USER_COLUMNS,
  SORT_ORDER,
  TECH_STATUS,
} from '@squaredash/shared/constants';

export const commonInclude = {
  billingAddress: true,
  shippingAddress: true,
  responsibleMembers: {
    where: {
      user: {
        techStatus: TECH_STATUS.ACTIVE,
      },
    },
    orderBy: {
      user: {
        [SORTABLE_USER_COLUMNS.NAME]: SORT_ORDER.ASC,
      },
    },
    select: {
      user: true,
    },
  },
};
