import { request } from './apiService';

import { Cafes } from '../shared/types/cafe/cafes';
import { CafeQueryParam } from '../shared/constants/сafeQueryParam';
import { CafeQueryParams } from '../shared/types/cafe/cafeQueryParams';

const STORAGE_KEY = 'cafes';

export const cafesService = {
  getCafes: async (params?: CafeQueryParams) => {
    try {
      const data = await request<Cafes>('cafes/cafes.json');

      const result = structuredClone(data);

      const perPage = params?.perPage;
      const currentPage = params?.page ? Number(params.page) : 1;

      let filteredCafes = [...result.cafes];

      Object.entries(params ?? {}).forEach(([key, value]) => {
        if (typeof value !== 'string') {
          return;
        }

        switch (key) {
          case CafeQueryParam.Query:
            filteredCafes = filteredCafes.filter(cafe =>
              cafe.name.toLowerCase().includes(value.toLowerCase()),
            );

            break;

          case CafeQueryParam.SortBy:
            filteredCafes.sort((a, b) => {
              let compare = 0;

              switch (params?.sortBy) {
                case 'popular':
                  compare = (a.rating ?? 0) - (b.rating ?? 0);
                  break;

                case 'price':
                  compare = (a.averageCheck ?? 0) - (b.averageCheck ?? 0);
                  break;
              }

              return params?.sortOrder === 'desc' ? -compare : compare;
            });

            break;

          case CafeQueryParam.Filter:
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
