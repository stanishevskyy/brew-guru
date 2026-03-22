import { request, wait } from './apiService';

import { CafeDetails } from '../shared/types/cafeDetails/cafeDetails';

const STORAGE_KEY = 'cafesDetails';

export const cafeDetailsService = {
  savedCafesDetails: async (): Promise<CafeDetails[]> => {
    try {
      await wait();

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
  getCafeDetails: async (cafeId: number): Promise<CafeDetails | null> => {
    try {
      const data = await cafeDetailsService.savedCafesDetails();

      const cafeDetails = data.find(c => c.id === cafeId);

      if (!cafeDetails) {
        throw new Error('Cafe details not found');
      }

      return cafeDetails;
    } catch {
      throw new Error('Failed to load cafe details');
    }
  },
};
