export function differentEntries<T>(base: T, compared: T): Partial<T> {
  const changed: Partial<T> = {};

  for (let [key, value] of Object.entries(compared)) {
    if (value !== (base as any)[key]) {
      (changed as any)[key] = value;
    }
  }

  return changed;
}

export function objectToUrlEncoded(data: object) {
  const entries = [];

  for (let key of Object.keys(data)) {
    if ((data as any)[key] == null) {
      continue;
    }

    entries.push(`${key}=${(data as any)[key].toString()}`);
  }

  return '?' + entries.join('&');
}
