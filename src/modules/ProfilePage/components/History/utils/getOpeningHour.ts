import { OpeningHour } from '../../../../../shared/types/user/user-hours.type';

export const getOpeningHour = (openingHours: OpeningHour[]) => {
  const jsDay = new Date().getDay();
  const today = jsDay === 0 ? 7 : jsDay;

  const todayHours = openingHours.find(hour => hour.weekday === today);

  if (!todayHours || !todayHours.isOpen) {
    return 'Closed today';
  }

  return `${todayHours.openTime}-${todayHours.closeTime}`;
};
