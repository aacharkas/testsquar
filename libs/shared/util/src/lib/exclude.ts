export function exclude<Entity, Key extends keyof Entity>(
  user: Entity,
  keys: Key[]
): Omit<Entity, Key> {
  for (const key of keys) {
    delete user[key];
  }
  return user;
}
