import { HistoryItem } from './user-history-item';

export interface UserHistory {
  id: number;
  userId: number;
  date: string;
  items: HistoryItem[];
}
