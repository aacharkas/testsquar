export const calculatePaginationItems = (
  totalPage,
  currentPage,
  visiblePageButtonCount
) => {
  let numberOfButtons =
    totalPage < visiblePageButtonCount ? totalPage : visiblePageButtonCount;
  const pageIndices = [currentPage];
  if (totalPage >= 2) {
    numberOfButtons--;
    [...Array(numberOfButtons)].forEach((_item, itemIndex) => {
      const pageNumberBefore = pageIndices[0] - 1;
      const pageNumberAfter = pageIndices[pageIndices.length - 1] + 1;
      if (
        pageNumberBefore >= 1 &&
        (itemIndex < numberOfButtons / 2 || pageNumberAfter > currentPage - 1)
      ) {
        pageIndices.unshift(pageNumberBefore);
      } else {
        pageIndices.push(pageNumberAfter);
      }
    });
  }
  return pageIndices;
};
