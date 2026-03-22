import { request } from './apiService';

import { CafeDetails } from '../shared/types/cafeDetails/cafeDetails';

const STORAGE_KEY = 'cafesDetails';

export const cafeDetailsService = {
  savedCafesDetails: async (): Promise<CafeDetails[]> => {
    try {
      const savedCafesDetails = localStorage.getItem(STORAGE_KEY);

      if (savedCafesDetails) {
        return JSON.parse(savedCafesDetails);
      }

      const data = await request<CafeDetails[]>(
        'cafes-details/cafes-details.json',
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed load cafe-details');
    }
  },
};
