import { historyService } from './historyService';
import { UserHistory } from '../shared/types/user/user-history.type';

const STORAGE_KEY = 'history';

export const userHistoryService = {
  getUserHistory: async (userId: number): Promise<UserHistory[]> => {
    try {
      const allHistory = await historyService.getHistory();

      return allHistory.filter(h => h.userId === userId);
    } catch {
      throw new Error('Failed load user history');
    }
  },

  addHistoryItem: async (item: UserHistory): Promise<UserHistory> => {
    try {
      const allHistory = await historyService.getHistory();

      allHistory.push(item);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(allHistory));

      return item;
    } catch {
      throw new Error('Failed add user history');
    }
  },

  deleteHistoryItem: async (id: number): Promise<void> => {
    try {
      const allHistory = await historyService.getHistory();
      const updated = allHistory
        .map(history => ({
          ...history,
          items: history.items.filter(item => item.id !== id),
        }))
        .filter(history => history.items.length > 0);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      throw new Error('Failed delete user history');
    }
  },
};
