export function pick<Entity, Key extends keyof Entity>(
  entity: Entity,
  keys: Key[]
): Pick<Entity, Key> {
  const result: Partial<Pick<Entity, Key>> = {};
  for (const key of keys) {
    if (key in entity) {
      result[key] = entity[key];
    }
  }
  return result as Pick<Entity, Key>;
}
