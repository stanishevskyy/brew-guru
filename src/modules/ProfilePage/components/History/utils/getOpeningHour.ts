import { OpeningHour } from '../../../../../shared/types/shared/openingHour';

const formatTime = (time: string) => {
  if (!time) {
    return '';
  }

  return time.split(':').slice(0, 2).join(':');
};

export const getOpeningHour = (openingHours: OpeningHour[]) => {
  const jsDay = new Date().getDay();
  const today = jsDay === 0 ? 7 : jsDay;

  const todayHours = openingHours.find(hour => hour.weekday === today);

  if (!todayHours || !todayHours.isOpen) {
    return 'Closed today';
  }

  return `${formatTime(todayHours.openTime)} - ${formatTime(todayHours.closeTime)}`;
};
