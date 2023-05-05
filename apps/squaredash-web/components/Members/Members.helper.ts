import { PERMISSIONS, PERMISSION_ACTIONS } from '../../constants/permissions';
import { ROUTES } from '../../constants/routes';
import { USER_STATUSES } from '../../constants/userStatuses';
import { MEMBER_ACTIONS } from './Members.constants';

export const getItemDropdowns = ({ item, t, isDetails, isOwnUser }) => {
  const array = [
    {
      href: `/${ROUTES.MEMBER}?id=${item.id}`,
      title: t('edit'),
      actionId: MEMBER_ACTIONS.EDIT,
      permitAction: PERMISSION_ACTIONS.UPDATE,
      permitUser: PERMISSIONS.USER,
      show: true,
    },
    {
      href: '',
      title: getMemberStatusButton(item, t),
      actionId: MEMBER_ACTIONS.CHANGE_STATUS,
      permitAction: PERMISSION_ACTIONS.UPDATE,
      permitUser: PERMISSIONS.USER_STATUS,
      show: !isOwnUser && !!getMemberStatusButton(item, t),
    },
    {
      href: '',
      title: t('delete'),
      actionId: MEMBER_ACTIONS.DELETE,
      permitAction: PERMISSION_ACTIONS.UPDATE,
      permitUser: PERMISSIONS.USER,
      show: false,
    },
    {
      href: '',
      title: t('view'),
      actionId: MEMBER_ACTIONS.VIEW,
      permitAction: PERMISSION_ACTIONS.GET,
      permitUser: PERMISSIONS.USER_PROFILE,
      show: !isDetails,
    },
  ];
  return array.filter((item) => item.show);
};

export const getMemberStatusButton = (item, t) => {
  switch (item.status) {
    case USER_STATUSES.ACTIVE:
      return t('suspend');
    case USER_STATUSES.SUSPENDED:
      return t('activate');
    default:
      return null;
  }
};

export const getMemberInitials = (item) => {
  return item.name.split(' ').map((item, index) => {
    if (index < 2) {
      return item[0];
    }
  });
};

export const dateFormat = (birthDate) => {
  const date = new Date(birthDate);
  return `${(0 + String(date.getMonth() + 1)).slice(-2)}/${(
    0 + String(date.getDate())
  ).slice(-2)}`;
};
