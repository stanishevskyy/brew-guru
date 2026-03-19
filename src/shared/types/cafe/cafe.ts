import { OpeningHour } from '../user/user-hours.type';

export interface Cafe {
  id: number;
  name: string;
  address: string;
  rating: number;
  averageCheck: number;
  openingHours: OpeningHour[];
  amenities: string[];
  workspaces: string[];
  menuFoodOptions: string[];
  status: string[];
}
