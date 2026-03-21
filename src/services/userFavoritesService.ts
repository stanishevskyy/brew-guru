import { favoritesService } from './favoritesService';

import { Favorites } from '../shared/types/favorites/favorites';
import { CafeCardInfo } from '../shared/types/shared/cafeCardInfo';

const STORAGE_KEY = 'favorites';

export const userFavoritesService = {
  getUserFavorites: async (userId: number): Promise<Favorites | null> => {
    try {
      const favorites = await favoritesService.getFavorites();

      return favorites.find(f => f.userId === userId) || null;
    } catch {
      throw new Error('Failed to load user favorites');
    }
  },
  addUserFavorite: async (
    userId: number,
    favoriteCafe: CafeCardInfo,
  ): Promise<Favorites> => {
    try {
      const favoritesData = await favoritesService.getFavorites();
      let user = favoritesData.find(f => f.userId === userId);

      if (!user) {
        user = { userId, favorites: [favoriteCafe] };

        favoritesData.push(user);
      } else {
        user.favorites = [...user.favorites, favoriteCafe];
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(favoritesData));

      return user;
    } catch {
      throw new Error('Failed to load user favorites');
    }
  },
  deleteUserFavorite: async (
    userId: number,
    favoriteId: number,
  ): Promise<Favorites | null> => {
    try {
      const favoritesData = await favoritesService.getFavorites();
      const user = favoritesData.find(f => f.userId === userId);

      if (!user) {
        return null;
      }

      user.favorites = user.favorites.filter(c => c.id !== favoriteId);

      let updatedData = favoritesData;

      if (user.favorites.length === 0) {
        updatedData = favoritesData.filter(f => f.userId !== userId);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      return user;
    } catch {
      throw new Error('Failed to delete user favorite');
    }
  },
};
