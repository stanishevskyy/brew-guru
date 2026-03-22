import { CafeDetails } from '../cafeDetails/cafeDetails';
import { Menu } from '../menu/menu';
import { Review } from '../reviews/review.type';

export type CafeResponse = {
  cafe: CafeDetails;
  menu: Menu | null;
  reviews: Review[];
};
