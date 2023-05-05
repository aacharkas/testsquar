import { DEFAULT_STATUSES } from '../../constants/constants';

export function badgeHelper(size: string, color: string, status: string) {
  let badgeSize, badgeColor;

  switch (size) {
    case 'small':
      badgeSize = 'px-2.5 py-0.5';
      break;
    case 'big':
    default:
      badgeSize = 'px-2 py-1.5';
      break;
  }

  const colorCase = (status && status.toUpperCase()) || color;
  switch (colorCase) {
    case 'gray':
    case DEFAULT_STATUSES.INACTIVE:
    case DEFAULT_STATUSES.VERIFIED:
      badgeColor = 'bg-gray-100 text-gray-700';
      break;
    case 'green':
    case DEFAULT_STATUSES.ACTIVE:
    case DEFAULT_STATUSES.JOB_CREATED:
      badgeColor = 'bg-green-100 text-green-800';
      break;
    case 'orange':
    case DEFAULT_STATUSES.SUSPENDED:
    case DEFAULT_STATUSES.IMPORTED:
      badgeColor = 'bg-orange-100 text-orange-800';
      break;
    case 'blue':
      badgeColor = 'bg-blue-50 text-blue-800';
      break;
    case 'white':
    default:
      badgeColor = 'bg-white text-gray-700 border border-gray-300';
      break;
  }

  return {
    badgeSize,
    badgeColor,
  };
}
