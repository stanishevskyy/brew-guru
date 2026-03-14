import { usersService } from './usersService';

import { User } from '../shared/types/user/user.type';

const STORAGE_KEY = 'users';

export const authService = {
  checkEmailExist: async (email: string): Promise<boolean> => {
    const storedUsers = await usersService.getUsers();

    const checkEmail = storedUsers.some(user => user.email === email);

    if (checkEmail) {
      throw new Error('A user with this email is already registered');
    }

    return true;
  },

  register: async (newUser: Omit<User, 'id'>): Promise<User> => {
    try {
      const storedUsers = await usersService.getUsers();

      if (storedUsers.some(user => user.email === newUser.email)) {
        throw new Error('A user with this email is already registered');
      }

      const id = Date.now();
      const userToSave: User = { id, ...newUser };

      storedUsers.push(userToSave);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(storedUsers));

      return userToSave;
    } catch {
      throw new Error('Failed to register user');
    }
  },

  login: async (email: string, password: string): Promise<User> => {
    try {
      const storedUsers = await usersService.getUsers();

      const currentUser = storedUsers.find(
        user => user.email === email && user.password === password,
      );

      if (!currentUser) {
        throw new Error('Invalid email or password');
      }

      return currentUser;
    } catch (error) {
      throw new Error(
        error instanceof Error ? error.message : 'Failed to login user',
      );
    }
  },

  logout: () => {
    return null;
  },
};
