import {
  FILE_ACTIONS,
  IMPORT_DETAILS_ACTIONS,
} from './ImportDetails.constants';

export const getItemDropdowns = ({ t }) => {
  return [
    {
      title: t('view'),
      actionId: FILE_ACTIONS.VIEW,
    },
    {
      title: t('download'),
      actionId: FILE_ACTIONS.DOWNLOAD,
    },
  ];
};

export const getHeaderDropdowns = ({ t }) => {
  return [
    {
      href: '',
      title: t('create_job'),
      actionId: IMPORT_DETAILS_ACTIONS.CREATE_JOB,
    },
    {
      href: '',
      title: t('show_version_history'),
      actionId: IMPORT_DETAILS_ACTIONS.SHOW_VERSION_HISTORY,
    },
  ];
};

export const getHeaderTableItems = ({ t }) => {
  return [
    t('description'),
    t('qty'),
    t('unit'),
    t('tax'),
    t('op'),
    t('rcv'),
    t('deprec'),
    t('acv'),
  ];
};

export const GOOGLE_OPTIONS = {
  componentRestrictions: { country: 'us' },
  fields: ['formatted_address'],
  types: [],
};
