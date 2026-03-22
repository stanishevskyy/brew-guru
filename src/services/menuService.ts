/* eslint-disable @typescript-eslint/indent */
import { request, wait } from './apiService';

import { Menu } from '../shared/types/menu/menu';
import { MenuQueryParams } from '../shared/types/menu/menuQueryParams';
import { QueryParam } from '../shared/constants/queryParam';

export const menuService = {
  getMenusByCafe: async (
    cafeId: number,
    params?: MenuQueryParams,
  ): Promise<Menu | null> => {
    try {
      await wait();

      const data = await request<Menu[]>('menu/menu.json');

      const cafeMenu = data.find(m => m.cafeId === cafeId) || null;

      // const perPage = params?.perPage;
      // const currentPage = params?.page ? Number(params.page) : 1;

      let filteredMenu = cafeMenu?.items;

      Object.entries(params ?? {}).forEach(([key, value]) => {
        switch (key) {
          case QueryParam.Query:
            if (typeof value === 'string') {
              filteredMenu = filteredMenu
                ?.map(menu => ({
                  ...menu,
                  items: menu.items.filter(menuItem =>
                    menuItem.name.toLowerCase().includes(value.toLowerCase()),
                  ),
                }))
                .filter(menu => menu.items.length > 0);
            }

            break;

          case QueryParam.Filter:
            if (Array.isArray(value) && value.length > 0) {
              filteredMenu = filteredMenu
                ?.map(menu => ({
                  ...menu,
                  items: menu.items.filter(menuItem =>
                    value.includes(menuItem.type),
                  ),
                }))
                .filter(menu => menu.items.length > 0);
            }

            break;

          case QueryParam.SortBy:
            filteredMenu = filteredMenu?.map(menu => ({
              ...menu,
              items: [...menu.items].sort((a, b) => {
                switch (params?.sortBy) {
                  case 'price_asc':
                    return (a.price ?? 0) - (b.price ?? 0);

                  case 'price_desc':
                    return (b.price ?? 0) - (a.price ?? 0);

                  default:
                    return 0;
                }
              }),
            }));
            break;
        }
      });
      // const totalItems = filteredCafes.length;
      // const totalPages = Math.ceil(totalItems / perPage!);

      // const lastOfindex = perPage! * +currentPage;
      // const firstOfindex = lastOfindex - perPage!;

      // result.cafes = filteredCafes.slice(firstOfindex, lastOfindex);
      // result.prevPage = currentPage > 1 ? currentPage - 1 : null;
      // result.nextPage = currentPage < totalPages ? currentPage + 1 : null;
      // result.totalPages = totalPages;
      // result.totalItems = totalItems;

      return cafeMenu
        ? {
            ...cafeMenu,
            items: filteredMenu || [],
          }
        : null;
    } catch {
      throw new Error('Failed to load cafe menu');
    }
  },
};
