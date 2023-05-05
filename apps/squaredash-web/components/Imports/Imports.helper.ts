import {
  DEFAULT_STATUSES,
  TABLE_ACTION_LABELS,
} from '../../../../libs/web/constants/constants';
import { ROUTES } from '../../constants/routes';
import { TImport } from './Imports.types';

export const getActionBasedOnStatus = (item: TImport, t: any) => {
  let action;
  switch (item.status) {
    case DEFAULT_STATUSES.JOB_CREATED:
      action = {
        action: TABLE_ACTION_LABELS.VIEW,
        label: t(TABLE_ACTION_LABELS.VIEW),
        href: `/${ROUTES.IMPORT}?id=${item.id}`,
      };
      break;
    case DEFAULT_STATUSES.IMPORTED:
    default:
      action = {
        action: TABLE_ACTION_LABELS.VIEW_TO_VERIFY,
        label: t(TABLE_ACTION_LABELS.VIEW_TO_VERIFY),
        href: `/${ROUTES.IMPORT}?id=${item.id}`,
      };
      break;
  }

  return action;
};
export const getItemDropdowns = (item, t) => {
  const array = [
    {
      type: TABLE_ACTION_LABELS.VIEW,
      title: t(TABLE_ACTION_LABELS.VIEW),
      href: `/${ROUTES.IMPORT}?id=${item.id}`,
      id: item?.id,
    },
    {
      type: TABLE_ACTION_LABELS.CREATE_JOB,
      title: t(TABLE_ACTION_LABELS.CREATE_JOB),
      href: '',
      id: item?.id,
    },
  ];
  return array;
};
