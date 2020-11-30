export function differentEntries<T>(base: T, compared: T): Partial<T> {
  const changed: Partial<T> = {};

  for (let [key, value] of Object.entries(compared)) {
    if (value !== (base as any)[key]) {
      (changed as any)[key] = value;
    }
  }

  return changed;
}
