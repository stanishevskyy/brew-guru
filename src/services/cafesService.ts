import { request, wait } from './apiService';

import { Cafes } from '../shared/types/cafe/cafes';
import { QueryParam } from '../shared/constants/queryParam';
import { CafeQueryParams } from '../shared/types/cafe/cafeQueryParams';

const STORAGE_KEY = 'cafes';

export const cafesService = {
  getCafes: async (params?: CafeQueryParams): Promise<Cafes> => {
    try {
      await wait();

      const data = await request<Cafes>('cafes/cafes.json');

      const result = structuredClone(data);

      const perPage = params?.perPage;
      const currentPage = params?.page ? Number(params.page) : 1;

      let filteredCafes = [...result.cafes];

      Object.entries(params ?? {}).forEach(([key, value]) => {
        switch (key) {
          case QueryParam.Query:
            if (typeof value === 'string') {
              filteredCafes = filteredCafes.filter(cafe =>
                cafe.name.toLowerCase().includes(value.toLowerCase()),
              );
            }

            break;

          case QueryParam.Filter:
            if (Array.isArray(value) && value.length > 0) {
              filteredCafes = filteredCafes.filter(cafe => {
                const allTags = [
                  ...(cafe.amenities ?? []),
                  ...(cafe.workspaces ?? []),
                  ...(cafe.menuFoodOptions ?? []),
                  ...(cafe.status ?? []),
                ];

                return value.every(filter => allTags.includes(filter));
              });
            }

            break;

          case QueryParam.SortBy:
            filteredCafes.sort((a, b) => {
              switch (params?.sortBy) {
                case 'popular':
                  return (b.rating ?? 0) - (a.rating ?? 0);

                case 'price_asc':
                  return (a.averageCheck ?? 0) - (b.averageCheck ?? 0);

                case 'price_desc':
                  return (b.averageCheck ?? 0) - (a.averageCheck ?? 0);

                default:
                  return 0;
              }
            });
            break;
        }
      });
      const totalItems = filteredCafes.length;
      const totalPages = Math.ceil(totalItems / perPage!);

      const lastOfindex = perPage! * +currentPage;
      const firstOfindex = lastOfindex - perPage!;

      result.cafes = filteredCafes.slice(firstOfindex, lastOfindex);
      result.prevPage = currentPage > 1 ? currentPage - 1 : null;
      result.nextPage = currentPage < totalPages ? currentPage + 1 : null;
      result.totalPages = totalPages;
      result.totalItems = totalItems;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(result));

      return result;
    } catch {
      throw new Error('Failed to load cafes');
    }
  },
};
