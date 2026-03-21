import { OpeningHour } from './openingHour';

export interface Cafe {
  id: number;
  name: string;
  img: string;
  address: string;
  rating: number;
  averageCheck: number;
  openingHours: OpeningHour[];
  amenities: string[];
  workspaces: string[];
  menuFoodOptions: string[];
  status: string[];
}
