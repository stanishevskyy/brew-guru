import { request, wait } from './apiService';

import { UserReport } from '../shared/types/user/user-reports.type';

const STORAGE_KEY = 'reports';

export const settingsService = {
  getSettings: async (): Promise<UserReport[]> => {
    try {
      await wait();

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      const data = await request<UserReport[]>(
        'users/review-reports/review-reports.json',
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed to get users');
    }
  },
};
