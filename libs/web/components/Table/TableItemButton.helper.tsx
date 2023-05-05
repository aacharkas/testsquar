import { TABLE_ACTION_LABELS } from '../../constants/constants';

export function tableItemButtonHelper(action: string) {
  let theme, color;

  switch (action) {
    case TABLE_ACTION_LABELS.CREATE_JOB:
      theme = 'light';
      color = 'gray';
      break;
    case TABLE_ACTION_LABELS.VIEW:
      theme = 'outline';
      color = 'primary';
      break;
    case TABLE_ACTION_LABELS.VIEW_TO_VERIFY:
    default:
      theme = 'dark';
      color = 'white';
      break;
  }

  return {
    theme,
    color,
  };
}
