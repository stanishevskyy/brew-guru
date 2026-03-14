import { Cafe } from './user-cafe-history.type';

export interface HistoryItem {
  id: number;
  cafe: Cafe;
  time: string;
}
