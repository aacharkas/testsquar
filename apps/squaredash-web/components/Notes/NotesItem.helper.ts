import { ROUTES } from 'apps/squaredash-web/constants/routes';

import { NOTES_ACTIONS } from './Notes.constants';

export const getItemDropdowns = (id, t, short = false) => {
  const array = [
    {
      href: '',
      title: t('view'),
      type: NOTES_ACTIONS.VIEW,
      id,
      showOnDetails: true,
    },
    {
      href: `/${ROUTES.NOTE}?id=${id}`,
      title: t('edit'),
      type: NOTES_ACTIONS.EDIT,
      id,
      showOnDetails: true,
    },
    {
      href: '',
      title: t('delete'),
      type: NOTES_ACTIONS.DELETE,
      id,
      showOnDetails: true,
    },
  ];
  if (short) return array.filter((item) => item.showOnDetails);
  else return array;
};
