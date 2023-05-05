import { UPLOAD_TYPE } from '@squaredash/shared/constants';
import { exclude, getFileLink } from '@squaredash/shared/util';

import { UserEntityWithAddress } from '../models/user-entity-with-address';
import { UserWithAddress } from '../models/user-with-address';

export const mapUserEntityWithAddressToUserWithAddress = (
  entity: UserEntityWithAddress
): UserWithAddress => {
  const mapped = { ...entity, address: entity.Address };
  const user = exclude(mapped, ['password', 'techStatus', 'Address']);

  return {
    ...user,
    avatar: getFileLink(user.avatarId, UPLOAD_TYPE.USER_AVATAR),
  };
};
