import { usersService } from './usersService';

import { User } from '../shared/types/user/user.type';

const STORAGE_KEY = 'users';

export const userService = {
  updateUser: async (currentUser: User): Promise<User> => {
    try {
      const storedUsers = await usersService.getUsers();
      const updatedUsers = storedUsers.map(user =>
        user.id === currentUser.id ? currentUser : user,
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

      return currentUser;
    } catch {
      throw new Error('Failed to update user');
    }
  },

  deleteUser: async (id: number): Promise<User | null> => {
    try {
      const storedUsers = await usersService.getUsers();

      const updatedUsers = storedUsers.filter(user => user.id !== id);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUsers));

      return null;
    } catch {
      throw new Error('Failed to delete user');
    }
  },
};
