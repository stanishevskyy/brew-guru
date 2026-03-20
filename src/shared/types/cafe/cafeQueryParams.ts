export type CafeQueryParams = Partial<{
  query: string;
  filter: string[];
  sortBy: 'popular' | 'price_asc' | 'price_desc';
  page: number;
  perPage: number;
}>;
