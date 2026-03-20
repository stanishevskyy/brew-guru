export const getPageNumber = (pageItem: number) => {
  const result = [];

  for (let i = 0; i < pageItem; i++) {
    result.push(i);
  }

  return result;
};
