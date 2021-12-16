export const closest = <K extends number, T>(value: K, data: Map<K, T>): T | undefined => {
  for (let i = value; i >= 0; i--) {
    if (data.has(i)) {
      return data.get(i);
    }
  }

  return undefined;
};
