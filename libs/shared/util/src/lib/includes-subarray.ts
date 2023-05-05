export const includesSubarray = <T>(parent: T[], subarray: T[]) =>
  subarray.every((item) => parent.includes(item));
