import { SortBy } from './SortBy';

export const sortLabels: Record<SortBy, string> = {
  [SortBy.Popular]: 'By popularity',
  [SortBy.Discounts]: 'By discounts',
  [SortBy.FromLower]: 'From lower',
  [SortBy.FromHigher]: 'From higher',
};
