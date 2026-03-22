export const getItemPerPage = (
  type: 'cafe' | 'menu',
  tablet: boolean,
  desktop: boolean,
) => {
  if (type === 'cafe') {
    if (desktop) {
      return 9;
    }

    if (tablet) {
      return 6;
    }

    return 3;
  }

  if (desktop) {
    return 9;
  }

  if (tablet) {
    return 10;
  }

  return 5;
};
