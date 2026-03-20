import { OpeningHour } from '../shared/openingHour';

export interface FavoritesCafe {
  id: number;
  name: string;
  address: string;
  rating: number;
  averageCheck: number;
  openingHours: OpeningHour[];
}
