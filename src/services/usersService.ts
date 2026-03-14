import { request, wait } from './apiService';

import { User } from '../shared/types/user/user.type';

const STORAGE_KEY = 'users';

export const usersService = {
  getUsers: async (): Promise<User[]> => {
    try {
      await wait();

      const users = localStorage.getItem(STORAGE_KEY);

      if (users) {
        return JSON.parse(users);
      }

      const data = await request<User[]>('users/users.json');

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed to get users');
    }
  },
};
