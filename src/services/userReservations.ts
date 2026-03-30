import { reservationService } from './reservationsService';

import { Booking } from '../shared/types/reservations/booking';
import { Reservation } from '../shared/types/reservations/reservation';

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

      // await cafeDetailsService.updateCafeDetails(
      //   userReservation.cafe.id,
      //   userReservation.reservation.date,
      //   userReservation.reservation.tableNumber,
      //   userReservation.reservation.startTime,
      // );

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));

      return newReservations;
    } catch {
      throw new Error('Failed to add user reservation');
    }
  },
  updateUserReservations: async (
    updatedReservation: Reservation,
  ): Promise<Booking> => {
    try {
      const reservations = await reservationService.getReservations();

      const index = reservations.findIndex(r => r.id === updatedReservation.id);

      if (index === -1) {
        throw new Error('Reservation not found');
      }

      const updatedBooking: Booking = {
        ...reservations[index],
        reservation: updatedReservation,
      };

      const updatedReservations = [...reservations];

      updatedReservations[index] = updatedBooking;

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedReservations));

      return updatedBooking;
    } catch {
      throw new Error('Failed to update users reservations');
    }
  },
};
