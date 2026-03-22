import { Dish } from './menuItem';

export interface Menu {
  id: number;
  cafeId: number;
  items: Dish[];
}
