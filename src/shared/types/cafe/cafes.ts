import { Cafe } from '../shared/cafe';

export interface Cafes {
  cafes: Cafe[];
  prevPage: number | null;
  nextPage: number | null;
  totalPages: number;
  totalItems: number;
}
