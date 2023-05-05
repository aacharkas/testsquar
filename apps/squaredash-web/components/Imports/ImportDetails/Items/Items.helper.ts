import { GROUP_ACTIONS } from './Items.constants';

export const getGroupDropdowns = ({ t, isHeader = false }) => {
  const array = [
    {
      href: '',
      title: t('add_group'),
      actionId: GROUP_ACTIONS.ADD_GROUP,
      show: true,
    },
    {
      href: '',
      title: t('add_item'),
      actionId: GROUP_ACTIONS.ADD_ITEM,
      show: true,
    },
    {
      href: '',
      title: t('delete_group'),
      actionId: GROUP_ACTIONS.DELETE_GROUP,
      show: !isHeader,
    },
  ];
  return array.filter((item) => item.show);
};
