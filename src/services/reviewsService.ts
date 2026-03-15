import { request, wait } from './apiService';

import { UserReview } from '../shared/types/user/user-review.type';

const STORAGE_KEY = 'reviews';

export const reviewsService = {
  getReviews: async (): Promise<UserReview[]> => {
    try {
      await wait();

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        return JSON.parse(stored);
      }

      const data = await request<UserReview[]>('users/reviews/reviews.json');

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed to get users');
    }
  },
};
