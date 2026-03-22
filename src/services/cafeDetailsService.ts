import { request, wait } from './apiService';
import { menuService } from './menuService';
import { reviewsService } from './reviewsService';

import { CafeDetails } from '../shared/types/cafeDetails/cafeDetails';
import { CafeResponse } from '../shared/types/cafeResponse/cafeResponse';

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
  getCafeDetails: async (cafeId: number): Promise<CafeResponse> => {
    await wait();
    // 1️⃣ Отримуємо базові дані кафе
    const cafes = await cafeDetailsService.savedCafesDetails();
    const cafe = cafes.find(c => c.id === cafeId);

    if (!cafe) {
      throw new Error(`Cafe with id ${cafeId} not found`);
    }

    // 2️⃣ Отримуємо меню цього кафе
    const menus = await menuService.getMenusByCafe(cafeId);

    // 3️⃣ Отримуємо відгуки
    const reviews = await reviewsService.getReviewsByCafe(cafeId);

    // 4️⃣ Повертаємо все в одному об’єкті
    return {
      cafe, // основна інформація
      menu: menus,
      reviews: reviews,
    };
  },
};
