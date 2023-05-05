import * as repository from './repository/user';

export function getById(userId: string) {
  return repository.getById(userId);
}

export function getByIdWithAddress(userId: string) {
  return repository.getByIdWithAddress(userId);
}
