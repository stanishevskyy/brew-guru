import { SortBy } from './SortBy';

export const sortLabels: Record<SortBy, string> = {
  [SortBy.Popular]: 'Most popular',
  [SortBy.PriceAsc]: 'Price: low to high',
  [SortBy.PriceDesc]: 'Price: high to low',
};
