export const closest = <T>(value: number, array: { [key: number]: T }): T | undefined => {
  for (let i = value; i >= 0; i--) {
    if (array[i]) {
      return array[i];
    }
  }

  return undefined;
};
