export const openPlace = (address: string) => {
  const url = `https://www.google.com/maps/search/?api=1&query=${address}`;

  window.open(url, '_blank', 'noopener,noreferrer');
};
