import { OpeningHour } from './user-hours.type';

export interface Cafe {
  id: number;
  img?: string;
  name: string;
  address: string;
  openingHours: OpeningHour[];
}
