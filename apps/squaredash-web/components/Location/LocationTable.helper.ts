import { ROUTES } from '../../constants/routes';
import { LOCATION_ACTIONS } from './LocationForm.constants';

const getItemDropdowns = (item, t) => {
  return [
    {
      href: `/${ROUTES.LOCATION}?id=${item.id}`,
      title: t('edit'),
      actionId: LOCATION_ACTIONS.EDIT,
    },
    {
      href: '',
      title: t('delete'),
      actionId: LOCATION_ACTIONS.DELETE,
    },
  ];
};

export default getItemDropdowns;
