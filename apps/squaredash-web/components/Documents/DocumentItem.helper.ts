import { DOCUMENTS_ACTIONS } from './DocumentItems.constants';

export const getItemDropdowns = (id, t, short = false) => {
  const array = [
    {
      href: '',
      title: t('view'),
      type: DOCUMENTS_ACTIONS.VIEW,
      id,
      showOnDetails: true,
    },
    {
      href: '',
      title: t('download'),
      type: DOCUMENTS_ACTIONS.DOWNLOAD,
      id,
      showOnDetails: true,
    },
    {
      href: '',
      title: t('rename'),
      type: DOCUMENTS_ACTIONS.RENAME,
      id,
      showOnDetails: false,
    },
    {
      href: '',
      title: t('delete'),
      type: DOCUMENTS_ACTIONS.DELETE,
      id,
      showOnDetails: false,
    },
  ];
  if (short) return array.filter((item) => item.showOnDetails);
  else return array;
};
