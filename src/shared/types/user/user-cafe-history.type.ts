import { OpeningHour } from '../shared/openingHour';

export interface HistoryCafe {
  id: number;
  img?: string;
  name: string;
  address: string;
  openingHours: OpeningHour[];
}
