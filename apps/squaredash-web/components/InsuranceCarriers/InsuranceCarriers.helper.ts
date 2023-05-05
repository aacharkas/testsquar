import { PERMISSIONS, PERMISSION_ACTIONS } from '../../constants/permissions';
import { ROUTES } from '../../constants/routes';
import { INSURANCE_CARRIER_ACTIONS } from './InsuranceCarriers.constants';

export const getItemDropdowns = (id, t, isDetails = false) => {
  const array = [
    {
      href: `/${ROUTES.INSURANCE_CARRIER}?id=${id}`,
      title: t('edit'),
      type: INSURANCE_CARRIER_ACTIONS.EDIT,
      permitAction: PERMISSION_ACTIONS.UPDATE,
      permitUser: PERMISSIONS.INSURANCE_CARRIERS,
      id,
      show: true,
    },
    {
      href: '',
      title: t('delete'),
      type: INSURANCE_CARRIER_ACTIONS.DELETE,
      permitAction: PERMISSION_ACTIONS.DELETE,
      permitUser: PERMISSIONS.INSURANCE_CARRIERS,
      id,
      show: true,
    },
    {
      href: '',
      title: t('view'),
      type: INSURANCE_CARRIER_ACTIONS.VIEW,
      permitAction: PERMISSION_ACTIONS.GET,
      permitUser: PERMISSIONS.INSURANCE_CARRIERS,
      id,
      show: !isDetails,
    },
  ];
  return array.filter((item) => item.show);
};
