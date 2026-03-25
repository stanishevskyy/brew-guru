import { Booking } from '../shared/types/reservations/booking';
import { request, wait } from './apiService';

const STORAGE_KEY = 'reservations';

export const reservationService = {
  getReservations: async (): Promise<Booking[]> => {
    try {
      await wait();

      const stored = localStorage.getItem(STORAGE_KEY);

      if (stored) {
        const parsed: Booking[] = JSON.parse(stored);

        return parsed;
      }

      const data = await request<Booking[]>('reservations/reservations.json');

      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

      return data;
    } catch {
      throw new Error('Failed to load reservations');
    }
  },
};
