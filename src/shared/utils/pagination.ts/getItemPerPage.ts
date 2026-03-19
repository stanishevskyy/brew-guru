export const getItemPerPage = (tablet: boolean, desktop: boolean) => {
  if (tablet) {
    return 6;
  } else if (desktop) {
    return 9;
  } else {
    return 3;
  }
};
