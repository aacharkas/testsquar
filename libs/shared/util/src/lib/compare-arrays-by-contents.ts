import * as _ from 'lodash';

export const compareArraysByContents = <T>(a: T[], b: T[]) => {
  const sortedA = a.sort();
  const sortedB = b.sort();

  return (
    sortedA.length === sortedB.length &&
    sortedA.every((item, ind) => _.isEqual(item, sortedB[ind]))
  );
};
