import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../apps/squaredash-web/constants/permissions';
import { CLAIM_ITEMS_ACTIONS } from './ClaimItems.contants';

export const getItemDropdowns = (id, t) => {
  return [
    {
      href: '',
      title: t('edit'),
      type: CLAIM_ITEMS_ACTIONS.EDIT,
      permitAction: PERMISSION_ACTIONS.UPDATE,
      permitUser: PERMISSIONS.CLAIM_ITEMS,
      id,
    },
    {
      href: '',
      title: t('delete'),
      type: CLAIM_ITEMS_ACTIONS.DELETE,
      permitAction: PERMISSION_ACTIONS.DELETE,
      permitUser: PERMISSIONS.CLAIM_ITEMS,
      id,
    },
  ];
};
export const getSuggestionsItemDropdowns = (id, t) => {
  return [
    {
      href: '',
      title: t('add_to_global'),
      type: CLAIM_ITEMS_ACTIONS.ADD_TO_GLOBAL,
      permitAction: PERMISSION_ACTIONS.ADD_TO_GLOBAL,
      permitUser: PERMISSIONS.CLAIM_ITEMS,
      id,
    },
    {
      href: '',
      title: t('reject'),
      type: CLAIM_ITEMS_ACTIONS.REJECT,
      permitAction: PERMISSION_ACTIONS.REJECT,
      permitUser: PERMISSIONS.CLAIM_ITEMS,
      id,
    },
  ];
};
