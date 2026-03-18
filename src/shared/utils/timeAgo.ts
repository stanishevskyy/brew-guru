export const timeAgo = (dateString: string) => {
  const diff = Date.now() - new Date(dateString).getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (days > 0) {
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  if (hours > 0) {
    return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  }

  return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
};
