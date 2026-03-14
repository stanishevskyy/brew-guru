import { request, wait } from './apiService';
import { UserHistory } from '../shared/types/user/user-history.type';

const STORAGE_KEY = 'history';

export const historyService = {
  getHistory: async (): Promise<UserHistory[]> => {
    try {
      await wait();

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      const data = await request<UserHistory[]>('users/history/history.json');

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed to get history');
    }
  },
};
