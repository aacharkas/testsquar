import {
  DEFAULT_STATUSES,
  STATUSES_LABELS,
} from '../../../../../libs/web/constants/constants';
import { DEFAULT_USER_ROLES, USER_ROLES_LABELS } from '../Members.constants';

export const fillRoles = (roles) => {
  let res = [];
  const array = roles.map((item) => item.name);
  if (array.includes(USER_ROLES_LABELS.ALL_ROLES)) {
    return [];
  } else {
    array.map((item) => {
      if (item) {
        res.push(DEFAULT_USER_ROLES[item]);
      } else {
        res = [];
      }
    });
    return Array.from(new Set(res));
  }
};

export const fillStatuses = (statuses) => {
  let res = [];
  const array = statuses.map((item) => item.name);
  if (array.includes(STATUSES_LABELS.ALL_STATUSES)) {
    return [];
  } else {
    array.map((item) => {
      if (item) {
        res.push(DEFAULT_STATUSES[item.toUpperCase()]);
      } else {
        res = [];
      }
    });
    return Array.from(new Set(res));
  }
};
