import { COMPANY_STATUSES } from '../../constants/companyStatuses';
import { ROUTES } from '../../constants/routes';
import { COMPANIES_ACTIONS } from './Companies.constants';

export const getItemDropdowns = (item, t) => {
  const array = [
    {
      href: `/${ROUTES.COMPANY}?id=${item.id}`,
      title: t('view'),
      type: COMPANIES_ACTIONS.VIEW,
      id: item.id,
      show: true,
    },
    {
      href: '',
      title: getCompanyStatusButton(item, t),
      type: COMPANIES_ACTIONS.CHANGE_STATUS,
      id: item.id,
      show: !!getCompanyStatusButton(item, t),
    },
  ];
  return array.filter((item) => item.show);
};

export const getCompanyStatusButton = (item, t) => {
  switch (item.status) {
    case COMPANY_STATUSES.ACTIVE:
      return t('inactivate');
    case COMPANY_STATUSES.INACTIVE:
      return t('activate');
    default:
      return null;
  }
};
