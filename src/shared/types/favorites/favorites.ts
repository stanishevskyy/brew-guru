import { CafeCardInfo } from '../shared/cafeCardInfo';

export interface Favorites {
  userId: number;
  favorites: CafeCardInfo[];
}
