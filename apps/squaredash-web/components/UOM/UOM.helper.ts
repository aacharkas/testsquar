import {
  PERMISSIONS,
  PERMISSION_ACTIONS,
} from '../../../../apps/squaredash-web/constants/permissions';
import { UOM_ACTIONS } from './UOM.constants';

export const getItemDropdowns = (id, t) => {
  return [
    {
      href: '',
      title: t('edit'),
      type: UOM_ACTIONS.EDIT,
      permitAction: PERMISSION_ACTIONS.UPDATE,
      permitUser: PERMISSIONS.MEASUREMENT_UNITS,
      id,
    },
    {
      href: '',
      title: t('delete'),
      type: UOM_ACTIONS.DELETE,
      permitAction: PERMISSION_ACTIONS.DELETE,
      permitUser: PERMISSIONS.MEASUREMENT_UNITS,
      id,
    },
  ];
};
