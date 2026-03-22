/* eslint-disable @typescript-eslint/indent */
import { request, wait } from './apiService';

import { Menu } from '../shared/types/menu/menu';
import { MenuResponse } from '../shared/types/menu/menuResponse';
import { MenuQueryParams } from '../shared/types/menu/menuQueryParams';
import { QueryParam } from '../shared/constants/queryParam';

export const menuService = {
  getMenusByCafe: async (
    cafeId: number,
    params?: MenuQueryParams,
  ): Promise<MenuResponse | null> => {
    try {
      await wait();

      const data = await request<Menu[]>('menu/menu.json');

      const cafeMenu = data.find(m => m.cafeId === cafeId);

      if (!cafeMenu) {
        return null;
      }

      // const perPage = params?.perPage;
      // const currentPage = params?.page ? Number(params.page) : 1;

      let filteredMenu = cafeMenu?.items;

      Object.entries(params ?? {}).forEach(([key, value]) => {
        switch (key) {
          case QueryParam.Query:
            if (typeof value === 'string') {
              filteredMenu = filteredMenu?.filter(dish =>
                dish.name.toLowerCase().includes(value.toLowerCase()),
              );
            }

            break;
          case QueryParam.Filter:
            if (Array.isArray(value) && value.length > 0) {
              filteredMenu = filteredMenu?.filter(dish =>
                value.includes(dish.type),
              );
            }

            break;

          case QueryParam.SortBy:
            filteredMenu = [...filteredMenu!].sort((a, b) => {
              switch (params?.sortBy) {
                case 'price_asc':
                  return a.price - b.price;

                case 'price_desc':
                  return b.price - a.price;

                default:
                  return 0;
              }
            });
            break;
        }
      });

      const perPage = params?.perPage ?? filteredMenu?.length;
      const currentPage = params?.page ? Number(params.page) : 1;

      const totalItems = filteredMenu?.length;
      const totalPages = Math.ceil(totalItems / perPage);

      const firstIndex = (currentPage - 1) * perPage!;
      const lastIndex = firstIndex + perPage;
      const pagedItems = filteredMenu?.slice(firstIndex, lastIndex);

      return {
        menu: {
          ...cafeMenu,
          items: pagedItems,
        },
        prevPage: currentPage > 1 ? currentPage - 1 : null,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        totalPages,
        totalItems,
      };
    } catch {
      throw new Error('Failed to load cafe menu');
    }
  },
};
