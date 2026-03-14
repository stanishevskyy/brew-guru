import { request, wait } from './apiService';

import { UserSettings } from '../shared/types/user/user-settings.type';

const STORAGE_KEY = 'settings';

export const settingsService = {
  getSettings: async (): Promise<UserSettings[]> => {
    try {
      await wait();

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      const data = await request<UserSettings[]>(
        'users/settings/settings.json',
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed to get users');
    }
  },
};
