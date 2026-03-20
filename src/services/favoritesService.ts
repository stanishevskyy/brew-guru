import { request, wait } from './apiService';

import { Favorites } from '../shared/types/favorites/favorites';

const STORAGE_KEY = 'favorites';

export const favoritesService = {
  getFavorites: async (): Promise<Favorites[]> => {
    try {
      await wait();

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      const data = await request<Favorites[]>('favorites/favorites.json');

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed load favorites cafe');
    }
  },
};
