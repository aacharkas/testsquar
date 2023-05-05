import { ROUTES } from '../../constants/routes';
import { ADMIN_ACTIONS } from './Admins.constants';

export const getItemDropdowns = ({ item, t, isDetails, isCurrentUser }) => {
  const array = [
    {
      href: `/${ROUTES.ADMIN}?id=${item.id}`,
      title: t('edit'),
      actionId: ADMIN_ACTIONS.EDIT,
      show: true,
    },
    {
      href: '',
      title: t('delete'),
      actionId: ADMIN_ACTIONS.DELETE,
      show: !isCurrentUser,
    },
    {
      href: '',
      title: t('view'),
      actionId: ADMIN_ACTIONS.VIEW,
      show: !isDetails,
    },
  ];
  return array.filter((item) => item.show);
};

export const getAdminInitials = (item) => {
  return item.name.split(' ').map((item, index) => {
    if (index < 2) {
      return item[0];
    }
  });
};
