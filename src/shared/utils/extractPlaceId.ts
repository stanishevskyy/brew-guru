export const extractPlaceId = (url: string) => {
  const match = url.match(/!1s([^!]+)!/);

  if (match && match[1]) {
    return decodeURIComponent(match[1]);
  }

  return null;
};
