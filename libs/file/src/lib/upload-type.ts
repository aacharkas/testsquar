import { UPLOAD_TYPE } from '@squaredash/shared/constants';

export const isUploadType = (candidate: string): candidate is UPLOAD_TYPE =>
  Object.values(UPLOAD_TYPE).includes(candidate as UPLOAD_TYPE);
