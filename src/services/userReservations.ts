import { reservationService } from './reservationsService';

import { Booking } from '../shared/types/reservations/booking';
import { cafeDetailsService } from './cafeDetailsService';

const STORAGE_KEY = 'reservations';

export const userReservations = {
  getUserReservations: async (userId: number): Promise<Booking[]> => {
    try {
      const reservations = await reservationService.getReservations();

      return reservations.filter(r => r.customer.id === userId);
    } catch {
      throw new Error('Failed load users reservations');
    }
  },
  addUserReservations: async (
    userReservation: Omit<Booking, 'id'>,
  ): Promise<Booking> => {
    try {
      const reservations = await reservationService.getReservations();

      const newReservations = {
        id: Date.now().toString(),
        ...userReservation,
      };

      const updatedReservations = [...reservations, newReservations];

      await cafeDetailsService.updateCafeDetails(
        userReservation.cafe.id,
        userReservation.reservation.date,
        userReservation.reservation.tableNumber,
        userReservation.reservation.startTime,
      );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));

      return newReservations;
    } catch {
      throw new Error('Failed to add user reservation');
    }
  },
};
