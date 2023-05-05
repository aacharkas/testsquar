import { ROUTES } from '../../constants/routes';
import { CUSTOMERS_ACTIONS } from './Customers.constants';

export const getItemDropdowns = ({
  id,
  t,
  short = false,
  notAbleToRemoveMember,
}) => {
  const array = [
    {
      href: `/${ROUTES.CUSTOMER}?id=${id}`,
      title: t('edit'),
      type: CUSTOMERS_ACTIONS.EDIT,
      show: true,
      id,
    },
    {
      href: '',
      title: t('delete'),
      type: CUSTOMERS_ACTIONS.DELETE,
      show: !notAbleToRemoveMember,
      id,
    },
    {
      href: '',
      title: t('view'),
      type: CUSTOMERS_ACTIONS.VIEW,
      show: !short,
      id,
    },
  ];
  return array.filter((item) => item.show);
};
