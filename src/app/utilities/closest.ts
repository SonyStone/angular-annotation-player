export const closestDown = <K extends number, T>(value: K, data: { [key in K]: T }): T | undefined => {
  for (let i = value; i >= 0; i--) {
    if (data[i]) {
      return data[i];
    }
  }

  return undefined;
};


export const closestUp = <K extends number, T>(value: K, data: { [key in K]: T }): T | undefined => {
  for (let i = value; i <= 900000; i++) {
    if (data[i]) {
      return data[i];
    }
  }

  return undefined;
};

export function closestUpNumber<K extends number, T>(
  value: K,
  data?: { [key in K]: T },
  size: K = 900000 as K,
): K {
  if (data) {
    for (let i = value; i <= size; i++) {
      if (data[i]) {
        return i;
      }
    }
  }

  return size as K;
};

export function closestDownNumber<K extends number, T>(
  value: K,
  data: { [key in K]: T },
): K {
  if (data) {
    for (let i = value; i >= 0; i--) {
      if (data[i]) {
        return i;
      }
    }
  }

  return 0 as K;
};