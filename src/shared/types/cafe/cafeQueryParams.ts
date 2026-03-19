export type CafeQueryParams = Partial<{
  query: string;
  filter: string[];
  sortBy: 'popular' | 'price';
  sortOrder: 'asc' | 'desc';
  page: number;
  perPage: number;
}>;
