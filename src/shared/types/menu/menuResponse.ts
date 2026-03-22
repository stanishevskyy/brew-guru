import { Menu } from './menu';

export interface MenuResponse {
  menu: Menu;
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  totalItems: number;
}
