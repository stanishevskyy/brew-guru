import { CafeDetails } from '../cafeDetails/cafeDetails';
import { Menu } from '../menu/menu';
import { UserReview } from '../user/user-review.type';

export type CafeResponse = {
  cafe: CafeDetails;
  menu: Menu | null;
  reviews: UserReview[];
};
