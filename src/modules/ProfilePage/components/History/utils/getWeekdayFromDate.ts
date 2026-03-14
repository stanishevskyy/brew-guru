export const getWeekdayFromDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
  });
};
