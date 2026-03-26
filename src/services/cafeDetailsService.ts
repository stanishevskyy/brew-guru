/* eslint-disable @typescript-eslint/indent */
import { request, wait } from './apiService';

import { CafeDetails } from '../shared/types/cafeDetails/cafeDetails';

const STORAGE_KEY = 'cafesDetails';

export const cafeDetailsService = {
  savedCafesDetails: async (): Promise<CafeDetails[]> => {
    try {
      await wait();

      const savedCafesDetails = localStorage.getItem(STORAGE_KEY);

      if (savedCafesDetails) {
        return JSON.parse(savedCafesDetails);
      }

      const data = await request<CafeDetails[]>(
        'cafes-details/cafes-details.json',
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed load cafe-details');
    }
  },
  getCafeDetails: async (cafeId: number): Promise<CafeDetails | null> => {
    try {
      const data = await cafeDetailsService.savedCafesDetails();

      const cafeDetails = data.find(c => c.id === cafeId);

      if (!cafeDetails) {
        throw new Error('Cafe details not found');
      }

      return cafeDetails;
    } catch {
      throw new Error('Failed to load cafe details');
    }
  },
  // updateCafeDetails: async (
  //   cafeId: number,
  //   date: string,
  //   tableId: number,
  //   startTime: string,
  // ) => {
  //   try {
  //     const data = await cafeDetailsService.savedCafesDetails();

  //     const cafeDetails = data.find(c => c.id === cafeId);

  //     const updatedCafe = cafeDetails?.availableTables.map(el =>
  //       el.date === date
  //         ? {
  //             ...el,
  //             tables: el.tables.map(elTables =>
  //               elTables.id === tableId
  //                 ? elTables.availableSlots.filter(
  //                     elSlots => elSlots.startTime !== startTime,
  //                   )
  //                 : elTables,
  //             ),
  //           }
  //         : el,
  //     );
  //   } catch (error) {}
  // },
  updateCafeDetails: async (
    cafeId: number,
    date: string,
    tableId: number,
    startTime: string,
  ) => {
    try {
      const data = await cafeDetailsService.savedCafesDetails();

      const updatedData = data.map(cafe => {
        if (cafe.id !== cafeId) {
          return cafe;
        }

        return {
          ...cafe,
          availableTables: cafe.availableTables.map(day => {
            if (day.date !== date) {
              return day;
            }

            return {
              ...day,
              tables: day.tables.map(table => {
                if (table.id !== tableId) {
                  return table;
                }

                return {
                  ...table,
                  availableSlots: table.availableSlots.filter(
                    slot => slot.startTime !== startTime,
                  ),
                };
              }),
            };
          }),
        };
      });

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedData));

      return updatedData.find(c => c.id === cafeId);
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : 'Failed to update cafe details',
      );
    }
  },
};
