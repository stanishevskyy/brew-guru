import { Menu } from '../shared/types/menu/menu';
import { request } from './apiService';

export const menuService = {
  getMenusByCafe: async (cafeId: number): Promise<Menu | null> => {
    try {
      const menu = await request<Menu[]>('menu/menu.json');

      return menu.find(m => m.cafeId === cafeId) || null;
    } catch {
      throw new Error('Failed load menu');
    }
  },
};
