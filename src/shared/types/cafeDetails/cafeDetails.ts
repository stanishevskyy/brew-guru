import { OpeningHour } from '../shared/openingHour';
import { AvailableTablesByDate } from './availableTables';

export interface CafeDetails {
  id: number;
  name: string;
  img: string;
  address: string;
  phone: string;
  rating: number;
  averageCheck: number;
  description: string;

  openingHours: OpeningHour[];
  availableTables: AvailableTablesByDate[];
}
