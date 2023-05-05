import { CUSTOMER_TYPE } from '../../../constants/roles';
import {
  CUSTOMERS,
  CUSTOMERS_LABELS,
  RESP_MEMBERS,
  RESP_MEMBERS_LABELS,
} from '../Customers.constants';

export const fillTypes = (types) => {
  if (types?.type === CUSTOMER_TYPE.ALL) {
    return {};
  } else {
    return types;
  }
};

export const fillCustomers = (customers) => {
  let res = [];
  const array = customers?.map((item) => item.name);
  if (array?.includes(CUSTOMERS_LABELS.ALL_PARENTS_CUSTOMERS)) {
    return [];
  } else {
    array?.map((item) => {
      if (item) {
        res.push(item);
      } else {
        res = [];
      }
    });
    return Array.from(new Set(res));
  }
};

export const fillRespMembers = (members) => {
  let res = [];
  const array = members?.map((item) => item.name);
  if (array?.includes(RESP_MEMBERS_LABELS.ALL_MEMBERS)) {
    return [];
  } else {
    array?.map((item) => {
      if (item) {
        res.push(item);
      } else {
        res = [];
      }
    });
    return Array.from(new Set(res));
  }
};
