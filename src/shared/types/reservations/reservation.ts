import { ReservationStatus } from './reservationStatus';

export interface Reservation {
  id: string;
  date: string;
  time: string;
  guestsCount: number;
  tableNumber: number;
  status: ReservationStatus;
  notes?: string;
}
