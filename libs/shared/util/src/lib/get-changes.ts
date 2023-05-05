type PartialRecord<K extends keyof any, T> = Partial<Record<K, T>>;

export function getChanges<T extends Record<string, any>>(
  current: T,
  newData: PartialRecord<keyof T, any>
): Record<string, { old: any; new: any }> {
  const changes: Record<string, { old: any; new: any }> = {};

  Object.entries(newData).forEach(([key, value]) => {
    if (Object.hasOwnProperty.call(current, key) && value !== current[key]) {
      changes[key] = {
        old: current[key],
        new: value,
      };
    }
  });

  return changes;
}
