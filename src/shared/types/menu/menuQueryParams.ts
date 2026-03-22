export type MenuQueryParams = Partial<{
  query: string;
  filter: string[];
  sortBy: 'popular' | 'price_asc' | 'price_desc';
  page: number;
  perPage: number;
}>;
