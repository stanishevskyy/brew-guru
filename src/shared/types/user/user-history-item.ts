import { HistoryCafe } from './user-cafe-history.type';

export interface HistoryItem {
  id: number;
  cafe: HistoryCafe;
  time: string;
}
