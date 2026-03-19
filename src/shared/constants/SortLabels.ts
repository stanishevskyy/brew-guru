import { SortBy } from './SortBy';

export const sortLabels: Record<SortBy, string> = {
  [SortBy.Popular]: 'By popularity',
  [SortBy.Price]: 'By price',
  [SortBy.FromLower]: 'From lower',
  [SortBy.FromHigher]: 'From higher',
};
