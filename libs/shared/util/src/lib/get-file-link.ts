import { UPLOAD_TYPE, UPLOAD_TYPE_MAP } from '@squaredash/shared/constants';
import { Config } from '@squaredash/shared/util';

export function getFileLink<T extends string | null>(
  id: T,
  type: UPLOAD_TYPE
): T {
  if (!id) {
    return null as T;
  }

  const uploadConfig = UPLOAD_TYPE_MAP[type];
  return `https://${Config.AWS.publicBucket}.s3.amazonaws.com/${uploadConfig.prefix}/${id}` as T;
}
