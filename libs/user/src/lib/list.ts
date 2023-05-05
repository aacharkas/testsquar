import { User, UserSearchOptions } from '@squaredash/shared/constants';
import { List } from '@squaredash/shared/interfaces';

import * as userRepository from './repository/user';

export async function list(options: UserSearchOptions): Promise<List<User>> {
  return userRepository.list(options);
}
