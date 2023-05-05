export const getActionButtons = (code, t) => {
  let firstActionButton, secondActionButton;
  switch (code) {
    case 'IM0064':
    case 'IM0068':
      secondActionButton = t('use_existing', { ns: 'buttons' });
      break;
    case 'IM0057':
      secondActionButton = t('save_as_new_version', { ns: 'buttons' });
      break;
    case 'IM0063':
      firstActionButton = t('new_customer', { ns: 'buttons' });
      secondActionButton = t('select_existing', { ns: 'buttons' });
      break;
    default:
      break;
  }

  return {
    firstActionButton,
    secondActionButton,
  };
};
