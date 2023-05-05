export const removeUndefined = (object: {
  [key: string]: any;
}): {
  [key: string]: any;
} => {
  Object.keys(object).forEach((key) => {
    if (typeof object[key] === 'object' && object[key] !== null) {
      object[key] = removeUndefined(object[key]);
    } else if (object[key] === undefined) {
      delete object[key];
    }
  });
  return object;
};
